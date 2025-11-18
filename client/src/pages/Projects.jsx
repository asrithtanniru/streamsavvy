import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchClientData(){
    try{
      const response = await axios.get("http://localhost:3000/projects");
      setProjects(response.data);
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
          <h1 className="text-2xl font-semibold">Projects</h1>
          <Link to="/clients/add" className="underline">Add projects</Link>
        </div>
        <p className="text-muted-foreground">Displaying {projects.length} projects in cards.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {projects.map(project => (
          <Link to={`/projects/${projects.id}`} key={project.id}> 
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-sm text-muted-foreground mb-1">
                ProjectId:{project.id}
              </p>
              <p className="text-sm mb-1">
                Description:{project.description}
              </p>
              <p className="text-sm mb-1 text-sidebar-accent-foreground">
                StartDate:{project.startDate}
              </p>
              <p className="text-sm mb-1 text-accent-foreground">
                DueDate:{project.dueDate}
              </p>
              <p className="text-sm mb-1">
                Budget:${project.budget}
              </p>
              <p className="text-sm mb-1">
                HoursLogged:{project.hoursLogged}hrs
              </p>
              <p className={`mt-2 text-sm font-medium ${project.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {project.status}
              </p>
            </Card>
          </Link>
        ))}
        {projects.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No clients found.</p>
        )}
      </div>
    </>
)
}
