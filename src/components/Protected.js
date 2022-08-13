import { Navigate } from "react-router-dom";
import StorageService from "../services/StorageService";

const Protected = ({ page, children }) => {
  console.log("children", children)
  const token = StorageService.getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }
  const companyDetail = StorageService.getCompanyDetail();
  console.log("companyDetail",companyDetail,page)
  if (!companyDetail && page !== 'company') {
    console.log("companyDetail....",companyDetail)
    return <Navigate to="/company" />;
  }
  return children;
};
export default Protected;