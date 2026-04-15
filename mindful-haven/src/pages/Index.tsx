import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import HomeTab from "@/pages/HomeTab";
import ActivitiesTab from "@/pages/ActivitiesTab";
import AdviceTab from "@/pages/AdviceTab";
import ExploreTab from "@/pages/ExploreTab";
import CommunitiesTab from "@/pages/CommunitiesTab";
import ProfileTab from "@/pages/ProfileTab";
import LumoraChat from "@/components/LumoraChat";

type TabId = "home" | "activities" | "advice" | "explore" | "communities" | "profile";

const tabs: Record<TabId, React.ComponentType> = {
  home: HomeTab,
  activities: ActivitiesTab,
  advice: AdviceTab,
  explore: ExploreTab,
  communities: CommunitiesTab,
  profile: ProfileTab,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const ActiveComponent = tabs[activeTab];

  return (
    <div className="flex flex-col min-h-screen bg-brand-soft overflow-hidden font-body">
      <main className="flex-1 transition-all duration-500 ease-in-out h-screen overflow-y-auto pb-28">
        <Header onTabChange={setActiveTab} />
        <div className="max-w-md mx-auto px-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ActiveComponent onTabChange={setActiveTab} />
        </div>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <LumoraChat />
    </div>
  );
};

export default Index;
