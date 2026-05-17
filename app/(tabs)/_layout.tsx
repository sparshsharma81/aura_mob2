import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const createTabIcon = (name: keyof typeof Ionicons.glyphMap) =>
  function TabIcon({ color, size }: Readonly<{ color: string; size: number }>) {
    return <Ionicons name={name} color={color} size={size} />;
  };

const HomeIcon = createTabIcon('home-outline');
const ExploreIcon = createTabIcon('compass-outline');
const MessagesIcon = createTabIcon('chatbubble-ellipses-outline');
const NotificationsIcon = createTabIcon('notifications-outline');
const ProfileIcon = createTabIcon('person-outline');

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0f172a',
        tabBarInactiveTintColor: '#94a3b8'
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: HomeIcon
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ExploreIcon
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: MessagesIcon
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Alerts',
          tabBarIcon: NotificationsIcon
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ProfileIcon
        }}
      />
    </Tabs>
  );
}
