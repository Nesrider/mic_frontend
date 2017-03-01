import React, {Component} from 'react';
import './home.scss';
import $ from 'jquery';
import {sortByWords, sortBySubmitted} from '../constants/sort.js';
import {block} from './block.js';

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sortNum: 0,
			sortFunc: [[sortByWords, "WORDS"],
				[sortBySubmitted, "SUBMITTED"]],
			numLoads: 0,
			maxLoads: 2,
			numArticles: 10,
			initArticleLenth: 0,
			curArticleData: [],
			curArticleLength: 0,
			articleData: []
		};
	}

	/*
		gets the articles when mounted
	*/
	componentDidMount() {
		const localSortNum = parseInt(localStorage.getItem('sortNum'), 10);
		let stateSortNum = this.state.sortNum;

		if (localSortNum !== null) {
			stateSortNum = localSortNum;
		}

		$.getJSON("data/articles.json", data => {
			this.setState({numLoads: 1,
				initArticleLenth: data.length,
				curArticleData: data.splice(0, this.state.numArticles).sort(
					this.state.sortFunc[stateSortNum][0]),
				sortNum: stateSortNum,
				curArticleLength: this.state.numArticles,
				articleData: data});
		});
	}

	/*
		sorts the articles by words or submitted, additional
		sorting functions and name can be added through initial state
	*/
	handleSortArticles() {
		const curArticleData = this.state.curArticleData;
		const sortFunc = this.state.sortFunc;
		let sortNumPlus = this.state.sortNum + 1;

		if (sortNumPlus === sortFunc.length) {
			this.setState({
				sortNum: 0
			});

			sortNumPlus = 0;
		}

		console.log(sortNumPlus);
		this.setState({
			sortNum: sortNumPlus,
			curArticleData: curArticleData.sort(sortFunc[sortNumPlus][0])
		});

		localStorage.setItem('sortNum', sortNumPlus);
	}

	/*
		Handles adding articles by check the number of articles we see
		If we load past the length of articles.json, we'll import more-arcticles.json
		and add additional articles from the additional json.
	*/
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
					curArticleData: this.state.curArticleData.concat(
						this.state.articleData.splice(0, this.state.numArticles)).sort(
						this.state.sortFunc[this.state.sortNum][0])
				})
			);
		} else {
			this.setState({
				curArticleLength: newLength,
				curArticleData: this.state.curArticleData.concat(
					this.state.articleData.splice(0, this.state.numArticles)).sort(
					this.state.sortFunc[this.state.sortNum][0])
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
		/*
			Builds the table of articles by rows and cols
		*/

		const numArticles = this.state.curArticleData.length;
		const rowNum = 3;
		const blocks = [];

		for (let i = 0; i < numArticles; i += rowNum) {
			const row = [];

			for (let j = i; j < i + rowNum; j++) {
				if (j < numArticles) {
					row.push(block(this.state.curArticleData[j]));
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
						<div className="mic_title col col-m-10 col-sm-9 col-xs-7">
							<img src="images/mic_logo_transparent.png"/>
						</div>
						<div onClick={this.handleSortArticles.bind(this)} className="sort_button btn col-m-2 col col-sm-2 col-xs-4">
							SORT BY {this.state.sortFunc[this.state.sortNum][1]}
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
