import { useEffect, useState } from "react";
import AdminPanel from "../components/AdminPanel";
import { useAuth } from "../contexts/authContext";
import DashboardChart from "../components/DashboardChart";

const AdminPage = () => {
  const { auth } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    productCountByCategory: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
        console.log(data);
        setDashboardData(data);
      } catch (error) {
        console.log(error);
        setError(
          error.message ? error.message : "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <AdminPanel>
      <h2 className="text-3xl mb-4">Dashboard</h2>
      <div className="mb-4">
        <h3 className="text-xl font-medium text-amber-500 mb-2">
          Total Sales Revenue
        </h3>
        <p className="text-2xl font-medium ml-2">
          Rs. {dashboardData.totalSales}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-medium text-amber-500 mb-2">
          Total Products added
        </h3>
        <div className="md:w-2/3 mb-4 mx-auto">
          <DashboardChart data={dashboardData.productCountByCategory} />
        </div>
      </div>
    </AdminPanel>
  );
};

export default AdminPage;
