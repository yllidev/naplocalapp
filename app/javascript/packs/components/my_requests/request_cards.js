import React from 'react';
import Cookies from 'js-cookie';
import { Grid, AppBar, Tabs, Tab } from '@material-ui/core';
import RequestCard from './request_card';
import NoRequests from './no_requests_component';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    }
});

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

class RequestCards extends React.Component {
    state = {
        value: 'one'
    } 
    
    handleChange = (event, newValue) => {
        this.setState({value: newValue})
    }

    render() {
        let { value } = this.state
        let userId = Cookies.getJSON('currentUser').user_id
        let userRequests = this.props.requests.filter(request => request.user_id === userId)
        const cards = userRequests.map(request => 
            <RequestCard request={request} repost={true} key={request.id} fetchRequests={this.props.fetchRequests}/>
        )

        let userRepliedRequests = this.props.requests.filter(request => request.replied_user_ids.includes(userId))
        const repliedcards = userRepliedRequests.map(request => 
            <RequestCard request={request} repost={false} key={request.id} fetchRequests={this.props.fetchRequests}/>
        )
        const noRequests = <NoRequests />

        let renderCards = () => {
           if(value == 'one') return userRequests.length ? cards : noRequests
           return userRepliedRequests.length ? repliedcards : noRequests
        }

        return(
            <React.Fragment>
                <div className={this.props.classes.root}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={this.handleChange} aria-label="wrapped label tabs example">
                            <Tab
                            value="one"
                            label="My Requests"
                            wrapped
                            {...a11yProps('one')}
                            />
                            <Tab value="two" label="My Replied Requests" {...a11yProps('two')} />
                        </Tabs>
                    </AppBar>
                </div>


                <Grid container id="my-requests-container" style={userRequests.length === 0 ? null : {padding: '10px', background: 'white'}}>
                    { renderCards() }
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(RequestCards);
