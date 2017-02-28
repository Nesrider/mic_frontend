import React, {Component} from 'react';
import './home.scss';
import $ from 'jquery';

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			numLoads: 0,
			maxLoads: 2,
			numArticles: 10,
			initArticleLenth: 0,
			curArticleData: [],
			curArticleLength: 0,
			articleData: []
		};
	}

	componentDidMount() {
		$.getJSON("data/articles.json", data => {
			console.log(data);
			this.setState({numLoads: 1,
				initArticleLenth: data.length,
				curArticleData: data.splice(0, this.state.numArticles),
				curArticleLength: this.state.numArticles,
				articleData: data});
		});
	}

	block(item) {
		return (<div key={item.id} className="col block col-sm-4 col-xs-12">
			<img src={item.image}/>
			<div className="block_title block_text">
				{item.title}
			</div>
			<div className="block_author block_text">
				{item.author}
			</div>
		</div>);
	}

	handleAddArticles() {
		const numLoads = this.state.numLoads;
		const maxLoads = this.state.maxLoads;
		const numArticles = this.state.numArticles;
		const newLength = this.state.curArticleLength + numArticles;
		const articleDataLength = this.state.initArticleLenth;
		const articleData = this.state.articleData;

		if (newLength > articleDataLength && numLoads < maxLoads) {
			$.getJSON("data/more-articles.json", data => {
				console.log(data);
				this.setState({numLoads: numLoads + 1,
					initArticleLenth: articleDataLength + data.length,
					articleData: articleData.concat(data)});
			}).then(() =>
				this.setState({
					curArticleLength: newLength,
					curArticleData: this.state.curArticleData.concat(this.state.articleData.splice(0, this.state.numArticles))
				})
			);
		} else {
			this.setState({
				curArticleLength: newLength,
				curArticleData: this.state.curArticleData.concat(this.state.articleData.splice(0, this.state.numArticles))
			});
		}
	}

	addOption() {
		const numLoads = this.state.numLoads;
		const maxLoads = this.state.maxLoads;
		const numArticles = this.state.numArticles;
		const newLength = this.state.curArticleLength + numArticles;
		const articleDataLength = this.state.initArticleLenth;

		if (newLength > articleDataLength && numLoads === maxLoads) {
			return "NO MORE ARTICLES";
		}
		return "VIEW MORE ARTICLES";
	}

	render() {
		const numArticles = this.state.curArticleData.length;
		const rowNum = 3;
		const blocks = [];

		for (let i = 0; i < numArticles; i += rowNum) {
			const row = [];

			for (let j = i; j < i + rowNum; j++) {
				if (j < numArticles) {
					row.push(this.block(this.state.curArticleData[j]));
				}
			}

			blocks.push((
				<div className="row">
					{row}
				</div>
				));
		}

		return (
			<div>
				<div className="container">
					<div className="row top_bar">
						<div className="mic_title col col-m-10 col-sm-9 col-xs-8">
							<img src="images/mic_logo_transparent.png"/>
						</div>
						<div className="sort_button btn col-m-2 col col-sm-2 col-xs-2">
							WORDS
						</div>
					</div>
				</div>
				<div className="container">
					{blocks}
				</div>
				<div className="container">
					<div className="row bot_bar">
						<div className="space col col-m-10 col-sm-9 col-xs-7"></div>
						<div onClick={this.handleAddArticles.bind(this)} className="text_button btn col-m-3 col col-sm-3 col-xs-4">
							{this.addOption()}
						</div>
					</div>
				</div>
			</div>
		);
	}

}
