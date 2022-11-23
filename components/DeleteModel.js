import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';

const DeleteModel = ({visible = false, cancelEvent, okEvent}) => {
  // const [modalVisible, setModalVisible] = useState(visible);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View className="bg-green-500 py-2">
              <Text style={styles.modalText}>Delete Field</Text>
            </View>

            <Text
              className="p-2 text-base text-gray-600"
              style={{fontFamily: 'BalooBhai2-Regular'}}>
              Would you really like to delete selected field from the dashboard
              list?
            </Text>
            <View className="flex flex-row py-4 justify-end px-2">
              <TouchableOpacity
                onPress={okEvent}
                className="py-2 px-4 rounded bg-green-500 mx-1">
                <Text
                  style={{fontFamily: 'BalooBhai2-SemiBold'}}
                  className="text-white text-base">
                  OK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancelEvent}
                className="py-2 px-4 rounded bg-green-500 mx-1">
                <Text
                  style={{fontFamily: 'BalooBhai2-SemiBold'}}
                  className="text-white text-base">
                  CANCEL
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'green',
    // padding: 10,
    width: '95%',
    // height: '30%',
    // alignItems: 'center',
    shadowColor: 'green',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'BalooBhai2-Bold',
  },
});

export default DeleteModel;
