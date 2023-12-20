import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable from './CustomerSalesTable';

const CustomerSaleMaster = () => {
  return (
    <div className="container-lg">
      <SalesHeader />
      <div>
        <CustomerSalesTable />
      </div>
    </div>
  );
};

export default CustomerSaleMaster;
