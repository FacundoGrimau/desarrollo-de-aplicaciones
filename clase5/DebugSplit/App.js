// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import CustomModal from './src/components/CustomModal';



/*const tareas = [
  { id: 1, value: "Ir al dentista" },
  { id: 2, value: "Jugar al tenis" },
  { id: 3, value: "Hacer las compras" },
  { id: 4, value: "Pasear a firulais" },
];*/

export default function App() {
  const [textItem, setTextItem] = useState("")
  const [itemList, setItemList] = useState([])
  const [modalView, setModalView] = useState(false)
  const [itemSelected, setItemSelected] = useState({})


  const addItem = () => {
    setItemList(  currentValue => [
      ...currentValue,
      {id: Math.random().toString(), value: textItem}
    ])
    setTextItem("")
    console.log(itemList)
  }

  const openModal = (item) => {
    console.log("Aca se ejecuta el modal")
    setItemSelected(item)
    setModalView(true)

  }

  const handleCancel = () => {
    setModalView(false)
    setItemSelected({})
  };
  const handleDelete = () =>{
    const filter = itemList.filter( task => task !== itemSelected)
    setItemList(filter)
    setModalView(false)
  }

  const handleChangeText = (text) => setTextItem(text)

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textItem}
          onChangeText={handleChangeText}
        />
        <Button title="Agregar" color="#9065CA" onPress={addItem} />
      </View>

      <View style={styles.taskContainer}>
        <FlatList
          data={itemList}
          keyExtractor={(tarea) => tarea.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openModal(item)}
              style={styles.card}
            >
              <Text style={styles.taskText}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
      <CustomModal 
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        modalView={modalView}
        itemSelected={itemSelected}
      />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    paddingTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderBottomColor: 'black', 
    borderBottomWidth: 1,
    width: 200,
    paddingHorizontal: 16,
  }, 
  taskContainer: {
    marginTop: 15,
  }, 
  card: {
    justifyContent: 'center',
    backgroundColor: '#666666',
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 5,
  },
  taskText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
