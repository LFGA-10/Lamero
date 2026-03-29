import { useState } from "react";
import BottomTabBar from "@/components/BottomTabBar";
import HomeTab from "@/pages/HomeTab";
import ActivitiesTab from "@/pages/ActivitiesTab";
import AdviceTab from "@/pages/AdviceTab";
import ExploreTab from "@/pages/ExploreTab";
import CommunitiesTab from "@/pages/CommunitiesTab";
import ProfileTab from "@/pages/ProfileTab";
import SettingsTab from "@/pages/SettingsTab";

type TabId = "home" | "activities" | "advice" | "explore" | "communities" | "profile" | "settings";

const tabs: Record<TabId, React.ComponentType> = {
  home: HomeTab,
  activities: ActivitiesTab,
  advice: AdviceTab,
  explore: ExploreTab,
  communities: CommunitiesTab,
  profile: ProfileTab,
  settings: SettingsTab,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const ActiveComponent = tabs[activeTab];

  return (
    <div className="min-h-screen">
      <ActiveComponent />
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
