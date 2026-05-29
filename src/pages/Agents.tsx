import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import ChatView from "@/components/chatbot/ChatView";
import { isAuthenticated } from "@/services/authService";

/**
 * Sección "Equipo de agentes". Sirve dos rutas:
 *   - /dashboard/agents            → roster (lista de agentes)
 *   - /dashboard/agents/:agentId   → chat con un agente concreto
 * `ChatView` decide cuál mostrar según el parámetro de la URL.
 */
const Agents = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!isAuthenticated()) navigate("/login");
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <DashboardLayout activeTab="agents">
      <ChatView />
    </DashboardLayout>
  );
};

export default Agents;
