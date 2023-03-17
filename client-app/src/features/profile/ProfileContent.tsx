import { Tab, TabPane } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileEditForm from "./ProfileEditForm";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
	profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
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
		{ menuItem: "Events", render: () => <TabPane>Events Content</TabPane> },
		{
			menuItem: "Followers",
			render: () => <TabPane>Followers Content</TabPane>,
		},
		{
			menuItem: "Following",
			render: () => <TabPane>Following Content</TabPane>,
		},
	];
	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition="right"
			panes={panes}
		></Tab>
	);
};
export default ProfileContent;
