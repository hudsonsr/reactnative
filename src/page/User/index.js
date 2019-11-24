import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
   Container,
   Header,
   Avatar,
   Name,
   Bio,
   Stars,
   Starred,
   OwnerAvatar,
   Info,
   Title,
   Author,
} from './styles';

export default class User extends Component {
   static navigationOptions = ({ navigation }) => ({
      // desestruturar props
      title: navigation.getParam('user').name,
   });

   static propTypes = {
      navigation: PropTypes.shape({
         getParam: PropTypes.func,
         navigate: PropTypes.func,
      }).isRequired,
   };

   state = {
      stars: [],
      page: 1,
      loading: false,
      refreshing: false,
   };

   async componentDidMount() {
      await this.loadStars();
   }

   loadStars = async () => {
      const { navigation } = this.props;
      const user = navigation.getParam('user');

      const { loading } = this.state;
      if (loading) return;

      this.setState({ loading: true });

      const { page, stars } = this.state;

      const response = await api.get(
         `/users/${user.login}/starred?page=${page}`
      );

      this.setState({
         stars: [...stars, ...response.data],
         loading: false,
         page: page + 1,
         refreshing: false,
      });
   };

   refreshList = async () => {
      const { navigation } = this.props;
      const user = navigation.getParam('user');
      this.setState({
         refreshing: true,
      });
      const response = await api.get(`/users/${user.login}/starred?page=1`);

      this.setState({
         stars: response.data,
         loading: false,
         page: 2,
         refreshing: false,
      });
   };

   renderFooter = () => {
      const { loading } = this.state;
      if (!loading) return null;

      return (
         <View>
            <ActivityIndicator color="7159c1" />
         </View>
      );
   };

   handleNavigate = repo => {
      const { navigation } = this.props;

      navigation.navigate('Repo', { repo });
   };

   render() {
      const { navigation } = this.props;
      const { stars, refreshing } = this.state;
      const user = navigation.getParam('user');

      return (
         <Container>
            <Header>
               <Avatar source={{ uri: user.avatar }} />
               <Name>{user.name}</Name>
               <Bio>{user.bio}</Bio>
            </Header>
            <Stars
               data={stars}
               keyExtractor={star => String(star.id)}
               renderItem={({ item }) => (
                  <Starred>
                     <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                     <Info>
                        <Title onPress={() => this.handleNavigate(item)}>
                           {item.name}
                        </Title>
                        <Author>{item.owner.login}</Author>
                     </Info>
                  </Starred>
               )}
               onEndReached={this.loadStars}
               onEndReachedThreshold={0.2}
               ListFooterComponent={this.renderFooter}
               onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
               refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
            />
         </Container>
      );
   }
}
