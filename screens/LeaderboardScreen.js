/********************************************************************** The Road to Valhalla! ************************************************************************
 *                                                                                                                                                                   *
 *  📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌           *
 *  📌                                                                                                                                                  📌         *
 *  📌                                                                                                                                                  📌        *
 *  📌     📌            📌    📌📌         📌           📌       📌         📌📌        📌             📌                      📌📌             📌        *
 *  📌      📌          📌    📌  📌        📌           📌       📌        📌  📌       📌             📌                     📌  📌            📌       *
 *  📌       📌        📌    📌    📌       📌           📌       📌       📌    📌      📌             📌                    📌    📌           📌       *
 *  📌        📌      📌    📌      📌      📌           📌       📌      📌      📌     📌             📌                   📌      📌          📌       *
 *  📌         📌    📌    📌📌📌📌📌     📌            📌📌📌📌📌    📌📌📌📌📌    📌              📌                  📌📌📌📌📌         📌       *
 *  📌          📌  📌    📌          📌    📌           📌       📌    📌         📌   📌              📌                 📌          📌        📌       *
 *  📌           📌📌    📌            📌   📌           📌       📌   📌           📌  📌              📌                📌            📌       📌       *
 *  📌            📌    📌              📌  📌📌📌📌📌 📌        📌  📌            📌 📌📌📌📌📌    📌📌📌📌📌📌   📌              📌      📌       *
 *  📌                                                                                                                                                  📌      *
 *  📌                                                                                                                                                  📌      *
 *  📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌      *
 *                                                                                                                                                             *
 *  Project Type  : CrossyGame with NFT management                                                                                                            *
 *   Project ID   : 2024-2                                                                                                                                   *
 *   Client Info  : Private                                                                                                                                 *
 *    Developer   : Rothschild (Nickname)                                                                                                                  *
 *   Source Mode  : 100% Private                                                                                                                          *
 *   Description  : CrossyGame project with NFT as a service.                                                                                            *
 *  Writing Style : P0413-K0408-K1206                                                                                                                   *
 *                                                                                                                                                     *
 ********************************************************************** The Road to Valhalla! *********************************************************
 */

// Sample Libraries
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Image, Platform, Dimensions, Linking, Switch, ScrollView } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import GameContext from '../context/GameContext';
// Personal informations
import HeaderScreen from "./HeaderScreen";

import { colors, commonStyle, fonts } from '../global/commonStyle';
import { getScoreList, getUserInfo } from '../global/global';
// Guide Page component
const LeaderboardScreen = () => {

  /* ================================ For Mobile Responsive ===============================*/
  const [evalWidth, setEvalWidth] = useState(768);
  const [isMobile, setIsMobile] = useState(Dimensions.get('window').width < evalWidth);
  const [top10, setTop10] = useState(true);
  const [isPC, setIsPC] = useState(Dimensions.get('window').width >= evalWidth);
  // const [userInfo, setUserInfo] = useState({});
  const {
    userInfo,
    setUserInfo,
  } = React.useContext(GameContext);
  const getScoreInfo = async () => {
    let response = await getScoreList(top10?"top10":"global", 10, 0);
    // console.log("response ============> ", response)
    console.log("recoe = ", response.data.code);
    if (response.data.code == "00") {
      console.log(response.data.data);
      
      setData(response.data.data);
    }
  }
  
  useEffect(() => {
    getScoreInfo();
    // if(localStorage.token) getUserInfo(localStorage.token).then(response => {
    //   if(response.data.code == "00"){
    //     setUserInfo(response.data.data)
    //   }
    // });
    const handleResize = () => {
      setIsMobile(window.innerWidth < evalWidth);
      setIsPC(window.innerWidth >= evalWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    
  }, [top10]);
  /* ================================ For Mobile Responsive ===============================*/
  // Initial Variables
  const navigation = useNavigation();

  const [path, setPath] = useState("leaderboard");

  const [data, setData] = useState([]);

  const getRankStyle = (rank) => {
    if (rank == 1) {
      return { color: 'black', background: 'rgba(243, 179, 76, 1)', borderRadius: '50%', border: '2px solid yellow' }
    } else if (rank == 2) {
      return { color: 'black', background: 'gray', borderRadius: '50%', border: '2px solid white' }
    } else if (rank == 3) {
      return { color: 'black', background: 'rgba(200, 139, 76, 1)', borderRadius: '50%', border: '2px solid yellow' }
    }
    return { background: 'black', borderRadius: '50%', border: '2px solid white' }
  }

  // Receiving events from the server

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      fontFamily: fonts.fantasy,
    }}>
      <HeaderScreen path={path}></HeaderScreen>

      <View style={{
        position: 'relative',
        height: 'calc(100vh - 100px)',
        background: 'black',
        display: 'flex',
        flexDirection: isPC ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {isPC &&
          <View style={{
            width: '50%', height: '100%',
            display: 'flex',
            borderRight: commonStyle.border,
          }}>
            <Image source={require("../assets/avatar/avatar_player3.png")}
              style={{
                width: '100%', height: '100%',
                margin: 'auto'
              }}
            />
          </View>
        }

        <View style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          columnGap: '10px',
          width: isPC ? '50%' : '100%',
          height: '100%',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{
            width: '100%',
            height: isPC ? '300px' : '185px',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: commonStyle.border,
          }}>
            <Text style={{ color: 'white', fontSize: '20px', fontFamily: 'Horizon' }}>Top Mobbers</Text>
            <Text style={{
              fontSize: isPC ? '96px' : '64px',
              color: '#FDC6D3',
              WebkitTextStroke: '1px #EF587B',
              filter: 'drop-shadow(0px 0px 20px #EF587B)',
              fontWeight: '700',
              // textShadow: '0 0 5px #fff',
              fontFamily: 'Horizon'
            }}>Leaderboard</Text>
            <View style={{
              display: 'flex', flexDirection: 'row',
              marginTop: '30px', alignItems: 'center',
              columnGap: '10px'
            }}>
              <Text style={{
                color: top10 ? 'gray' : 'white',
                fontFamily: 'Horizon',
                fontSize: '16px'
              }}>
                Top 10 only
              </Text>
              <SwitchToggle
                switchOn={top10}
                onPress={() => { 
                  // getScoreList(top10?"top10":"global", 10, 0).then(res => {

                  // })
                  setTop10(!top10)
                }}
                circleColorOff="#FFFFFF"
                circleColorOn="#FFFFFF"
                backgroundColorOn="#EF587B"
                backgroundColorOff="#5CE1E6"
                containerStyle={{
                  width: 51,
                  height: 31,
                  borderRadius: 25,
                  padding: 2,
                }}
                circleStyle={{
                  width: 27,
                  height: 27,
                  borderRadius: 15,
                }}
              />
              <Text style={{
                color: !top10 ? 'gray' : 'white',
                fontFamily: 'Horizon',
                fontSize: '16px'
              }}>
                Global Players
              </Text>
            </View>
          </View>
          <ScrollView style={{
            width: isPC ? '50vw' : '100%',
            height: '600px',
          }} showsVerticalScrollIndicator={false}>
            {data.map((player, index) => {
              return (<View style={{
                display: 'flex', flexDirection: 'row',
                width: '100%', justifyContent: 'space-between',
                padding: '10px',
                border: commonStyle.border,
              }}>
                <Text style={{
                  color: 'white', fontSize: '20px',
                  width: '40px',
                  fontFamily: 'Horizon',

                  borderRadius: '50%',
                  ...getRankStyle(index + 1)
                }}>{index + 1}</Text>
                <Text style={{ color: userInfo.id==player.id ? "#ef587b": 'white', fontSize: '20px', fontFamily: 'Horizon',}}>{player.name}</Text>
                <Text style={{ width:"40px", color: userInfo.id==player.id ? "#ef587b": 'white', fontSize: '20px', fontFamily: 'Horizon',textAlign: 'right'}}>{player.scores}</Text>
              </View>);
            })}
          </ScrollView>



        </View>
      </View>

    </View >
  );
};

export default LeaderboardScreen;


{/*
// on click of play button
<button className="decoration-button" onClick={() => {
    if (userName !== "") {
        setGameMode(0);
        navigation.navigate("GameScreen");
    }
}} >Play !</button>

// Join Server button
{serverId &&
    <button className="decoration-button" onClick={() => {
        if (userName == "") {
            window.alert("Enter UserName !");
            return;
        }

        socket.emit('message', JSON.stringify({
            cmd: 'JOIN_GAME',
            name: serverId,
            player2: userName
        }));

    }} >Join Server
    </button>}

// Create Private Room Button
<button className="decoration-button" onClick={() => {
    // Creating the room
    if (userName == "") {
        window.alert("Enter UserName !");
        return;
    }
    setOtherName("waiting...");

    socket.emit('message', JSON.stringify({
        cmd: 'CREATE_ROOM',
        player1: userName,
        map: globalMap
    }));
}}>Create Private Room</button>

 */}
