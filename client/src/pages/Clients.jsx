import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import axios from "axios";
import { useEffect ,useState} from "react";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchClientData(){
    try{
      const response = await axios.get("http://localhost:3000/clients");
      setClients(response.data);
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
          <h1 className="text-2xl font-semibold">Clients</h1>
          <Link to="/clients/add" className="underline">Add Client</Link>
        </div>
        <p className="text-muted-foreground">Displaying {clients.length} clients in cards.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {clients.map(client => (
          <Link to={`/clients/${client.id}`} key={client.id}> 
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-2">{client.name}</h2>
              <p className="text-sm mb-1 text-muted-foreground">
                ClientId:{client.id}
              </p>
              <p className="text-sm">
                ContactName:{client.contactName}
              </p>
              <p className="text-sm mb-1 text-sidebar-accent-foreground">
                Email:{client.email}
              </p>
              <p className="text-sm mb-1 text-accent-foreground">
                Phone:{client.phone}
              </p>
              <p className="text-sm mb-1">
                Industry:{client.industry}
              </p>
              <p className={`mt-2 text-sm font-medium ${client.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {client.status}
              </p>
            </Card>
          </Link>
        ))}
        {clients.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No clients found.</p>
        )}
      </div>
    </>
  );
}
