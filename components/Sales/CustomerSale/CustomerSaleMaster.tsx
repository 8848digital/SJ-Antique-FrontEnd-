import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable from './CustomerSalesTable';
import CustomerSaleTable1 from './CustomerSalesTable1';
import CustomerSalesTable2 from './CustomerSalesTable2';

const CustomerSaleMaster = () => {
  return (
    <div className="container-lg">
      <SalesHeader />
      <div>
        <CustomerSaleTable1 />
        <CustomerSalesTable2 />
        <CustomerSalesTable />
      </div>
    </div>
  );
};

export default CustomerSaleMaster;
