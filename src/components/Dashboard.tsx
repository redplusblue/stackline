import { useAppSelector } from '../store/hooks';
import Chart from './Chart';
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
    const currentProduct = useAppSelector((state) => state.product.currentProduct);

    if (!currentProduct) {
        return <div className="dashboard-container">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <h4>Retail Sales</h4>
            <Chart />
        </div>
    );
};

export default Dashboard;