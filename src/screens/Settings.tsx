import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../utils'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler'

const Settings = ({navigation}:any) => {

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile")
  }
  const navigateToSecurity = () => {
    console.log("called security function");
  }
  const navigateToNotifications = () => {
    console.log("called notification function");
  }
  const navigateToPrivacy = () => {
    console.log("called Privacy function");
  }
  const navigateToSubscription = () => {
    console.log("called Subscription function");
  }
  const navigateToSupport = () => {
    console.log("called Support function");
  }
  const navigateToTermsAndPolicies = () => {
    console.log("called Terms And Policies function");
  }


  const navigateToFreeSpace = () => {
    console.log("called FreeSpace function");
  }
  const navigateToDateSaver = () => {
    console.log("called DateSaver function");
  }
  const navigateToReportProblem = () => {
    console.log("called ReportProblem function");
  }
  const addAccount = () => {
    console.log("called add account function");
  }
  const logout = () => {
    console.log("called logout function");
  }
  const accountItems = [
    {icon: "person-outline", text: "Edit Profile", action: navigateToEditProfile },
    {icon: "security", text: "Security", action: navigateToSecurity },
    {icon: "notifications-none", text: "Notifications", action: navigateToNotifications },
    {icon: "lock-outline", text: "Privacy", action: navigateToPrivacy },
  ];

  const supportItems = [
    {icon: "credit-card", text: "My Subscription", action: navigateToSubscription}, 
    {icon: "help-outline", text: "Help & Support", action: navigateToSupport },
    {icon: "info-outline", text: "Terms and Policies", action: navigateToTermsAndPolicies },
  ];

  const cacheAndCellularItems = [
    {icon: "delete-outline", text: "Free up space", action: navigateToFreeSpace },
    {icon: "save-alt", text: "Date Saver", action: navigateToDateSaver },
  ];

  const actionsItems = [
    {icon: "outlined-flag", text: "Report a problem", action: navigateToReportProblem },
    {icon: "people-outline", text: "Add Account", action: addAccount },
    {icon: "logout", text: "Log out", action: logout },
  ]

  const renderSettingsItem = ({ icon, text, action }:any) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: COLORS.gray,
      }}
    >
          <MaterialIcons 
            name={icon}
            size={24}
            color={COLORS.black}
          />
          <Text
            style={{
              marginLeft: 36,
              ...FONTS.body3,
              fontWeight: 600,
              fontSize: 16,
            }}
          >{text}</Text>
    </TouchableOpacity>
  )
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}>
      <View style={{
        marginHorizontal: 12,
        flexDirection: "row",
        justifyContent: "center"
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons 
            name={'keyboard-arrow-left'}
            size={24}
            color={COLORS.black}
          />
         
        </TouchableOpacity>
        <Text style={{...FONTS.h3}}>
          Settings
        </Text>
      </View>

      
      <ScrollView style={{marginHorizontal: 12}}>

        {/* Account Settings */}
        <View style={{marginBottom: 12}}>
          <Text style={{...FONTS.h4, marginVertical: 10, }}>Account</Text>
          <View style={{
            borderRadius: 12,
            backgroundColor: COLORS.gray
          }}>
            {
              accountItems.map((item: any, index:any)=>(
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))
            }
          </View>
        </View>

        {/* Support and About settings */}
        <View style={{marginBottom: 12}}>
          <Text style={{...FONTS.h4, marginVertical: 10, }}>Support & About</Text>
          <View style={{
            borderRadius: 12,
            backgroundColor: COLORS.gray
          }}>
            {
              supportItems.map((item: any, index:any)=>(
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))
            }
          </View>
        </View>


        {/* Cache & Cellular */}
        <View style={{marginBottom: 12}}>
          <Text style={{...FONTS.h4, marginVertical: 10, }}>Cache & Cellular</Text>
          <View style={{
            borderRadius: 12,
            backgroundColor: COLORS.gray
          }}>
            {
              cacheAndCellularItems.map((item: any, index:any)=>(
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))
            }
          </View>
        </View>

        {/* Actions Settings */}
        <View style={{marginBottom: 12}}>
          <Text style={{...FONTS.h4, marginVertical: 10, }}>Actions Settings</Text>
          <View style={{
            borderRadius: 12,
            backgroundColor: COLORS.gray
          }}>
            {
              actionsItems.map((item: any, index:any)=>(
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))
            }
          </View>
        </View>
        
      </ScrollView>

      
    </SafeAreaView>
  )
}

export default Settings
