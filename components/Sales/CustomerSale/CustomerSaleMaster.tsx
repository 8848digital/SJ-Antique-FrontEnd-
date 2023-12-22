import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable from './CustomerSalesTable';
import CustomerSaleTable1 from './CustomerSalesTable1';
import CustomerSalesTable2 from './CustomerSalesTable2';
import useClientHook from '@/hooks/master/client-hook';

const CustomerSaleMaster = () => {
  const { clientList, setSearchClient, searchClient }: any = useClientHook();
  return (
    <div className="container-lg">
      <SalesHeader />
      <div>
        <CustomerSaleTable1
          clientList={clientList}
          searchClient={searchClient}
          setSearchClient={setSearchClient}
        />
        <CustomerSalesTable2 />
        <CustomerSalesTable />
      </div>
    </div>
  );
};

export default CustomerSaleMaster;
