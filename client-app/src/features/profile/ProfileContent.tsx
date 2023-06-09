import { Tab, TabPane } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileAbout from "./ProfileAbout";
import ProfileActivities from "./ProfileActivities";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
	profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
	const { profileStore } = useStore();
	const panes = [
		{
			menuItem: "About",
			render: () => (
				<TabPane>
					<ProfileAbout />
				</TabPane>
			),
		},
		{
			menuItem: "Photos",
			render: () => (
				<TabPane>
					<ProfilePhotos profile={profile} />
				</TabPane>
			),
		},
		{
			menuItem: "Events",
			render: () => (
				<TabPane>
					<ProfileActivities />
				</TabPane>
			),
		},
		{
			menuItem: "Followers",
			render: () => (
				<TabPane>
					<ProfileFollowings />
				</TabPane>
			),
		},
		{
			menuItem: "Following",
			render: () => (
				<TabPane>
					<ProfileFollowings />
				</TabPane>
			),
		},
	];
	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition="right"
			panes={panes}
			onTabChange={(e, data) => {
				profileStore.setActiveTab(data.activeIndex);
			}}
		></Tab>
	);
};
export default ProfileContent;
