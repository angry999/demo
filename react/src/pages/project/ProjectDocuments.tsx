import React, { Component } from "react";
import Environment from '../../Environment';
import UserContext from '../../UserContext';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Typography, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ProjectPdf } from '../../tsapi/api';
import PdfLink from '../../widgets/PdfLink';

interface IProps {
	project: any
}

interface IState {
	dialog_open: boolean
	, uploading: boolean
	, error_message: string
	, files: ProjectPdf[]
}

/**
 *
 */
class ProjectDocuments extends Component<IProps, IState>
{
	constructor(props: IProps) {
		super(props);
		this.state = {
			dialog_open: false
			, uploading: false
			, error_message: ''
			, files: this.props.project.pdfs
		};
	}

	onChange(e: any) {
		console.log('uploadfiles');
		const files = Array.from(e.target.files)
		this.setState({ dialog_open: false, uploading: true, error_message: '' })

		const formData = new FormData()

		files.forEach((file: any, i: any) => {
			console.log('uploadfiles - ' + file);
			formData.append(i, file)
		})

		let value = this.context;
		fetch(Environment.website_base_url + '/api/ProjectPdf/' + this.props.project.id,
			{
				method: 'POST',
				headers: new Headers({
					'Authorization': 'Bearer ' + value.token
				}),
				body: formData
			})
			.then((res) => {
				try {
					if (!res.ok) {
						if (res.status === 403)
							throw Error('You are not authorized to upload to this project');
						throw new Error('The response was an http ' + res.status + ' and a message reading ' + res.statusText);
					}
					return res.json();
				}
				catch (error) {
					this.setState({ dialog_open: true, error_message: error.message });
				}
			})
			.then(results => {
				let currentFiles = this.state.files;
				if (results != null) {
					for (let index = 0; index < results.length; index++) {
						let thisFile = results[index];
						let asObject = thisFile as ProjectPdf;
						currentFiles.push(asObject);
					}
				}
				console.log('results ' + results);
				this.setState({ uploading: false, files: currentFiles });
			}).catch((error) => {
				console.log('error ' + error);
				this.setState({ dialog_open: true, error_message: error.message });
			})
	}

	handleClose(e: any) {
		this.setState({ dialog_open: false });
	}

	handleDelete(e: any) {
		let id = e.currentTarget.id;
		let value = this.context;
		fetch(Environment.website_base_url + '/api/ProjectPdf/' + id + '?action=delete',
			{
				method: 'POST',
				headers: new Headers({
					'Authorization': 'Bearer ' + value.token
				})
			})
			.then((res) => {
				try {
					if (!res.ok) {
						if (res.status === 403)
							throw Error('You are not authorized to delete from this project');
						throw new Error('The response was an http ' + res.status + ' and a message reading ' + res.statusText);
					}
					return res.json();
				}
				catch (error) {
					this.setState({ dialog_open: true, error_message: error.message });
				}
			})
			.then(results => {
				console.log('results ' + results);
				let currentFiles = this.state.files;
				for (let index = 0; index < currentFiles.length; index++) {
					let thisFile = currentFiles[index];
					if (thisFile.id === id)
						currentFiles.splice(index, 1);
				}
				this.setState({ uploading: false, files: currentFiles });
			}).catch((error) => {
				console.log('error ' + error);
				this.setState({ dialog_open: true, error_message: error.message });
			})
	}

	render() {
		let is_open = this.state.dialog_open;
		let error_text = this.state.error_message;
		console.log('render: dialog:' + is_open);
		let files = (this.state.files == null) ? [] : this.state.files;
		return (
			<Paper>
				<Container maxWidth={false} >
					<Grid container spacing={3}>
						{files.map((pdf: any) => {
							pdf.pdf_type = 'projectpdf';
							return (
								<Grid item xs={3}>
									<PdfLink pdf={pdf} text={pdf.title} />
									<IconButton id={pdf.id} aria-label="delete" onClick={this.handleDelete.bind(this)}>
										<DeleteIcon></DeleteIcon>
									</IconButton>
								</Grid>
							)
						})}
						<Grid item xs={12}>
							<div>
								<Button variant="contained" component="label">Upload New
									<input type="file" onChange={this.onChange.bind(this)} style={{ display: "none" }} />
								</Button>
								<Typography>{error_text}</Typography>
							</div>
						</Grid>
					</Grid>
				</Container>
				<Dialog
					open={is_open}
					onClose={this.handleClose.bind(this)}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">File upload error</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<Typography>{this.state.error_message}</Typography>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
							Acknowledge
					</Button>
					</DialogActions>
				</Dialog>
			</Paper>
		);
	}
}

ProjectDocuments.contextType = UserContext;

export default ProjectDocuments;
