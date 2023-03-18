import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, List, ListItem, Popup, PopupContent } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/stores/store";
import ProfileCard from "../../profile/ProfileCard";

interface Props {
	attendees: Profile[];
}

const ActivityListItemAttendees = ({ attendees }: Props) => {
	const styles = {
		borderColor: "orange",
		borderWidth: 3,
	};

	return (
		<List horizontal>
			{attendees.map((attendee) => (
				<Popup
					hoverable
					key={attendee.username}
					trigger={
						<ListItem
							key={attendee.username}
							as={Link}
							to={`/profiles/${attendee.username}`}
						>
							<Image
								size="mini"
								circular
								src={attendee.image || "/assets/user.png"}
								bordered
								style={attendee.following ? styles : null}
							/>
						</ListItem>
					}
				>
					<PopupContent>
						<ProfileCard profile={attendee} />
					</PopupContent>
				</Popup>
			))}
		</List>
	);
};
export default observer(ActivityListItemAttendees);
