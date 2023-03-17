import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import {
	Button,
	ButtonGroup,
	Card,
	CardGroup,
	Grid,
	GridColumn,
	Header,
	Image,
	TabPane,
} from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
	profile: Profile;
}

const ProfilePhotos = ({ profile }: Props) => {
	const {
		profileStore: {
			isCurrentUser,
			uploadPhoto,
			uploading,
			loading,
			setMainPhoto,
			deletePhoto,
		},
	} = useStore();
	const [addPhotoMode, setAddPhotoMode] = useState(false);
	const [target, setTarget] = useState("");

	const handlePhotoUpload = (file: Blob) => {
		uploadPhoto(file).then(() => setAddPhotoMode(false));
	};

	const handleSetMainPhoto = (
		photo: Photo,
		e: SyntheticEvent<HTMLButtonElement>
	) => {
		setTarget(e.currentTarget.name);
		setMainPhoto(photo);
	};

	const handleDeletePhoto = (
		photo: Photo,
		e: SyntheticEvent<HTMLButtonElement>
	) => {
		setTarget(e.currentTarget.name);
		deletePhoto(photo);
	};

	return (
		<TabPane>
			<Grid>
				<GridColumn width={16}>
					<Header floated="left" icon="image" content="Photos" />
					{isCurrentUser && (
						<Button
							floated="right"
							basic
							content={addPhotoMode ? "Cancel" : "Add Photo"}
							onClick={() => setAddPhotoMode(!addPhotoMode)}
						/>
					)}
				</GridColumn>
				<GridColumn width={16}>
					{addPhotoMode ? (
						<PhotoUploadWidget
							uploadPhoto={handlePhotoUpload}
							loading={uploading}
						/>
					) : (
						<CardGroup itemsPerRow={5}>
							{profile.photos?.map((photo) => {
								return (
									<Card key={photo.id} style={{ borderColor: "#000" }}>
										<Image src={photo.url} />
										{isCurrentUser && (
											<ButtonGroup fluid widths={2}>
												<Button
													basic
													style={{
														paddingLeft: 0,
														paddingRight: 0,
														borderTopLeftRadius: 0,
													}}
													color="green"
													content="Main"
													name={photo.id}
													disabled={photo.isMain}
													loading={target === photo.id && loading}
													onClick={(e) => handleSetMainPhoto(photo, e)}
												/>
												<Button
													basic
													color="red"
													name={`delete-${photo.id}`}
													disabled={photo.isMain}
													style={{
														paddingLeft: 0,
														paddingRight: 0,
														borderTopRightRadius: 0,
													}}
													loading={target === `delete-${photo.id}` && loading}
													icon="trash"
													onClick={(e) => handleDeletePhoto(photo, e)}
												/>
											</ButtonGroup>
										)}
									</Card>
								);
							})}
						</CardGroup>
					)}
				</GridColumn>
			</Grid>
		</TabPane>
	);
};
export default observer(ProfilePhotos);
