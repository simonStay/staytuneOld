import React from 'react';
import inspirationalQuotes from 'inspirational-quotes';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, ScrollView, Text } from 'react-native';
import styles from './styles';

let id1 = 1;
let id2 = id1 + 1;
export default class Chat extends React.Component {
  state = {
    messages: []
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: id1,
          text: 'welcome to chat screen',
          createdAt: new Date(),
          user: {
            _id: id2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    // console.log("message", JSON.stringify(messages));
    id1 = id2 + 1;
    id2 = id1 + 1;
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        setTimeout(() => {
          const message = [
            {
              _id: id1,
              text: inspirationalQuotes.getRandomQuote(),
              createdAt: new Date(),
              user: {
                _id: id2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any'
              }
            }
          ];
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message)
          }));
        }, 3000);
      }
    );
  }

  render() {
    // return (
    //   <GiftedChat
    //     messages={this.state.messages}
    //     onSend={messages => this.onSend(messages)}
    //     user={{
    //       _id: 1
    //     }}
    //   />
    // );
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.initialText}>CHAT COMING SOON....</Text>
        </ScrollView>
      </View>
    )
  }
}
