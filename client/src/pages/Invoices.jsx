import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Invoices() { 
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchClientData(){
    try{
      const response = await axios.get("http://localhost:3000/invoices");
      setInvoices(response.data);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
}

useEffect(()=>{
  fetchClientData();
},[]);
if (loading) {
    return <div className="p-4">Loading clients...</div>;
}
return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Invoices</h1>
          <Link to="/clients/add" className="underline">Add Invoices</Link>
        </div>
        <p className="text-muted-foreground">Displaying {invoices.length} invoices in cards.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {invoices.map(invoice => (
          <Link to={`/invoices/${invoices.id}`} key={invoice.id}> 
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-2">{invoice.id}</h2>
              <p className="text-sm text-muted-foreground mb-1">
                ProjectId:{invoice.projectId}
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                ClientId:{invoice.clientId}
              </p>
              <p className="text-sm mb-1">
                InvoiceDate:{invoice.invoiceDate}
              </p>
              <p className="text-sm mb-1">
                DueDate:{invoice.dueDate}
              </p>
              <p className="text-sm mb-1">
                Description:{invoice.description}
              </p>
              <p className="text-sm mb-1 text-sidebar-accent-foreground">
                StartDate:{invoice.startDate}
              </p>
              <p className="text-sm mb-1 text-accent-foreground">
                DueDate:{invoice.dueDate}
              </p>
              <p className="text-sm mb-1">
                Amount:${invoice.amount}
              </p>
              <p className="text-sm mb-1">
                PaymentTerms:{invoice.paymentTerms}
              </p>
              {invoice.status === 'Paid' && invoice.paymentDate && (
                <p className="text-sm font-medium">
                  Payment Date: {invoice.paymentDate}
                </p>
              )}
              <p className={`mt-2 text-sm font-medium ${invoice.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {invoice.status}
              </p>
            </Card>
          </Link>
        ))}
        {invoices.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No clients found.</p>
        )}
      </div>
    </>
)
}
