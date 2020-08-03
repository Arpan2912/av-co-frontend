import React,{ Component } from 'react';
import { Label, Input, Button } from 'reactstrap';
import ContactService from '../../services/ContactService';

class SearchContact extends Component {
  state = {
    contacts:[],
    personName :null, 
    showPersonList : false,
    controls:{
      person: {
        value: '',
        valid: null,
        touched: false,
        nullValue: null,
        invalidPassword: null
      },
    }
  }

  componentDidMount() {
    let { controls } =this.state;
    const { person: personProp } = this.props;
    controls.person = personProp;
    this.setState({ controls });
    this.getContacts(true);
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

   handleClickOutside = event => {
      const { forwardedRef } = this.props;
      if (forwardedRef.current && !forwardedRef.current.contains(event.target)) {
        this.setState({
          showPersonList: false,
        });
      }
  }

  handlePersonSearchChange = (e) => {
    let { personName, controls } = this.state;
    const { person } = controls;
    personName = e.target.value;
    person.value = null;
    // const value = e.target.value;
    this.setState({ personName,controls  },()=>{
      this.getContacts();
    });
  }

  openPersonToggle = () => {
    let { showPersonList } = this.state;
    showPersonList = true;
    this.setState({
      showPersonList
    });
  }

  onSelectPerson = (contact) => {
    let { personName, showPersonList, controls } = this.state;
    const { person } = controls;
    const { name, uuid } = contact;
    personName = name;
    person.value = uuid;
    showPersonList = false;
    this.props.getSelectedPersonControl(person);
    this.setState({ personName, controls, showPersonList });
  }

  getContacts = (firstTime) =>{
    let { personName } =this.state;
    const { person } = this.props;
    ContactService.getContacts(1,1000000,personName,false)
      .then(data=>{
        console.log("data",data);
        if(data.data && data.data.data && data.data.data.contacts){
          this.setState({ contacts : data.data.data.contacts })
          if(person.value){
            let contactIndex = data.data.data.contacts.findIndex(c=>c.uuid === person.value)
            personName = data.data.data.contacts[contactIndex].name;
            this.setState({personName})
          }
        }
      })
      .catch(e=>{
        console.log("e",e);
      })
  }
  
  render(){
    const { personName, showPersonList, controls, contacts } = this.state;
    const { person } = controls;
    const { forwardedRef } = this.props;

    return <div ref={forwardedRef}>
        {/* <Label for="status">Contact Name</Label> */}
        <Input type="text" name="person" autoComplete="off" value={personName} onChange={this.handlePersonSearchChange.bind(this)}
          onFocus={this.openPersonToggle.bind(this)}></Input>
        {showPersonList &&
          <div className="p-list">
            {contacts.map((c, i) =>
              <Button
                className="list-button"
                onClick={this.onSelectPerson.bind(this, c)}
              >
                {c.name}
              </Button>
            )}
          </div>
        }
      </div>
    
  }
}

export default React.forwardRef(
  function myFunction(props, ref) {
    return <SearchContact {...props} forwardedRef={ref} />;
  }
);