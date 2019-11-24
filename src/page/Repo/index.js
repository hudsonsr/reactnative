import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default class Repo extends Component {
   static navigationOptions = ({ navigation }) => ({
      // desestruturar props
      title: navigation.getParam('repo').name,
   });

   static propTypes = {
      navigation: PropTypes.shape({
         getParam: PropTypes.func,
      }).isRequired,
   };

   state = {
      loading: false,
   };

   handleLoading = () => this.setState({ loading: true });

   handleEndLoading = () => this.setState({ loading: false });

   render() {
      const { navigation } = this.props;
      const repo = navigation.getParam('repo');
      const { loading } = this.state;
      return (
         <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator color="7159c1" />}
            <WebView
               source={{ uri: repo.html_url }}
               style={{ flex: 1 }}
               onLoadStart={this.handleLoading}
               onLoadEnd={this.handleEndLoading}
            />
         </View>
      );
   }
}
