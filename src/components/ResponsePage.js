import React from "react";
import axios from "axios";
import { Container, List, makeStyles, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		padding: theme.spacing(1),
	},
}));
export default function ResponsePage(props) {
	const classes = useStyles();
	const [responsesList, setresponsesList] = React.useState(null);
	React.useEffect(() => {
		axios.get("http://localhost:5000/api/form/responses/" + props.match.params.id).then((res) => {
			res.data.map((i) => console.log(i));
			setresponsesList(res.data);
		});
	}, []);
	return (
		<Container>
			<Paper className={classes.root} elevation={1}>
				<Typography variant="h3" align="center">
					Response List
				</Typography>
			</Paper>
			<List>
				{responsesList &&
					responsesList.map((response, index) => (
						<>
							<Typography className={classes.questionIndex} align="left" color="secondary" gutterBottom={true}>
								Response {index + 1}
							</Typography>
							<TableContainer component={Paper} className={classes.root}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>	<Typography color="primary">Question Label</Typography></TableCell>
											<TableCell align="right">
												<Typography color="primary">User Response</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									{Object.getOwnPropertyNames(response.fields).map((field) => (
										<TableRow key={field} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
											<TableCell component="th" scope="row">
												{field}
											</TableCell>
											<TableCell align="right">{response.fields[field]}</TableCell>
										</TableRow>
									))}
								</Table>
							</TableContainer>
						</>
					))}
			</List>
		</Container>
	);
}
