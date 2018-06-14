import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNews } from '../actions/news'
import NewsListItem from '../components/NewsListItem'
import PublishersList from './PublishersList'

class NewsList extends Component {
  	
	constructor(props) {
		super(props)

		this.state = {
			publisher: 'abc-news'
		}
	}

	componentWillMount() {
		this.props.getNews(this.state.publisher)
	}

	renderNews() {
		const {news} = this.props

		if (news.articles) {
			return news.articles.map((article, index) => {
				return <NewsListItem key={index} article={article}/>
			})
		} else {
			return <div>Loading news</div>
		}
	}

	getSelectedPublisherCallback(publisher) {
		this.setState({
			publisher: publisher
		}, function() {
			this.props.getNews(this.state.publisher)
		})
	}

  	render() {
    	return (
      		<div>
      			<PublishersList getSelectedPublisherCallback={this.getSelectedPublisherCallback.bind(this)}/>
        		<h4>News List</h4>
        		<hr/>
        		<div className="row col s12">
        			{this.renderNews()}
        		</div>
      		</div>
		)
  	}
}

const mapStateToProps = (state) => {
	return {
		news: state.news
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getNews}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)
