import { Avatar, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		padding: theme.spacing(1),
	},
}));
export default function CreatedFormsPage() {
	const classes = useStyles();

	const [formsList, setFormsList] = React.useState(null);
	React.useEffect(() => {
		axios.get("http://localhost:5000/api/form/getall").then((res) => {
			setFormsList(res.data);
		});
	}, []);
	return (
		<Container>
    <Paper className={classes.root} elevation={1}>
        <Typography  variant="h3" align="center">
          Form List
        </Typography>
      </Paper>
			<List>
				{formsList &&
					formsList.map((form, index) => (
						<>
							<ListItem alignItems="flex-start" button={true} component={Link} to={`responses/${form._id}`}>
								<ListItemAvatar>
									<Avatar src={"https://ui-avatars.com/api/?background=random&rounded=true&name=" + form.formName} />
								</ListItemAvatar>
								<ListItemText
									primary={form.formName}
									secondary={
										<React.Fragment>
											<Typography sx={{ display: "inline" }} component="span" variant="body2" color="primary">
												{`Description : ${form.description}`}
											</Typography>
										</React.Fragment>
									}
								/>
							</ListItem>
							<Divider variant="inset" component="li" />
						</>
					))}
			</List>
		</Container>
	);
}
