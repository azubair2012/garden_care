import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { DashboardOverview } from "@/components/Dashboard/DashboardOverview";
import { ClientList } from "@/components/Clients/ClientList";
import { VolunteerList } from "@/components/Volunteers/VolunteerList";
import { CaseList } from "@/components/Cases/CaseList";
import { RapidResponseList } from "@/components/RapidResponse/RapidResponseList";
import { SafeguardingList } from "@/components/Safeguarding/SafeguardingList";
import { AdvocacyList } from "@/components/Advocacy/AdvocacyList";
import { ReportsDashboard } from "@/components/Reports/ReportsDashboard";
import { SettingsPanel } from "@/components/Settings/SettingsPanel";
import { ClientProfile } from "@/components/Profiles/ClientProfile";
import { VolunteerProfile } from "@/components/Profiles/VolunteerProfile";
import { CaseProfile } from "@/components/Profiles/CaseProfile";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<{type: string, id: string} | null>(null);

  const handleProfileNavigation = (type: string, id: string) => {
    setSelectedProfile({ type, id });
  };

  const handleBackToSection = () => {
    setSelectedProfile(null);
  };

  const renderContent = () => {
    // Handle profile views
    if (selectedProfile) {
      switch (selectedProfile.type) {
        case "client":
          return <ClientProfile clientId={selectedProfile.id} onBack={handleBackToSection} />;
        case "volunteer":
          return <VolunteerProfile volunteerId={selectedProfile.id} onBack={handleBackToSection} />;
        case "case":
          return <CaseProfile caseId={selectedProfile.id} onBack={handleBackToSection} />;
        default:
          return <DashboardOverview onNavigateToProfile={handleProfileNavigation} />;
      }
    }

    // Handle main sections
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview onNavigateToProfile={handleProfileNavigation} />;
      case "clients":
        return <ClientList onNavigateToProfile={handleProfileNavigation} />;
      case "volunteers":
        return <VolunteerList onNavigateToProfile={handleProfileNavigation} />;
      case "cases":
        return <CaseList />;
      case "rapid-response":
        return <RapidResponseList />;
      case "safeguarding":
        return <SafeguardingList />;
      case "advocacy":
        return <AdvocacyList />;
      case "reports":
        return <ReportsDashboard />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <DashboardOverview onNavigateToProfile={handleProfileNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-eden-surface/30">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex relative">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
