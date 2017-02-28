import React, {Component} from 'react';
import './home.scss';
import $ from 'jquery';

export class Home extends Component {
	constructor(props) {
		super(props);

		$.getJSON("data/articles.json", data => {
			console.log(data);
			this.setState({curArticleData: data.splice(0, 10),
				articleData: data});
		});
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="row top_bar">
						<div className="mic_title col col-m-10 col-sm-8 col-xs-8">
							<img src="images/mic_logo_transparent.png"/>
						</div>
						<div className="sort_button btn col-m-2 col col-sm-2 col-xs-2">
							WORDS
						</div>
					</div>
				</div>
			</div>
		);
	}

}
