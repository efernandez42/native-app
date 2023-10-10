import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, GestureResponderEvent, Alert, View, TouchableOpacity, Text, ScrollView } from "react-native";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

// Mot de passe correct (à des fins de démonstration)
const correctPassword = "motdepasse123";

const TextInputExample = () => {
  const [oldPassword, onChangeOldPassword] = useState("");
  const [newPassword, onChangeNewPassword] = useState("");
  const [confirmNewPassword, onChangeConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe

  async function onPressLearnMore(event: GestureResponderEvent) {
    try {
      
      await activateKeepAwake();
      
      // Vérifier l'ancien mot de passe
      // if (oldPassword !== correctPassword) {
      //   Alert.alert("Erreur", "L'ancien mot de passe est incorrect.");
      //   return;
      // }

      // Vérifier si le champ "Nouveau mot de passe" correspond au champ "Confirmer le nouveau mot de passe"
      if (newPassword !== confirmNewPassword) {
        Alert.alert("Erreur", "Les champs 'Nouveau mot de passe' et 'Confirmer le nouveau mot de passe' ne correspondent pas.");
        return;
      }

      // Vérifier si le mot de passe respecte les critères (chiffre, majuscule, minuscule, caractère spécial, 12 caractères)
      const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d]).{12,}$/;
      if (!passwordRegex.test(newPassword)) {
        Alert.alert("Erreur", "Votre mot de passe doit contenir : \nUn chiffre, \nUne majuscule, \nUne minuscule, \nUn caractère spécial, \nAu moins 12 caractères.");
        return;
      }

      // Vérifier si l'ancien mot de passe est identique au nouveau mot de passe
      if (oldPassword === newPassword) {
        Alert.alert("Erreur", "Le nouveau mot de passe ne peut pas être identique à l'ancien mot de passe.");
        return;
      }

      // Réinitialiser les champs de mot de passe
      onChangeOldPassword("");
      onChangeNewPassword("");
      onChangeConfirmNewPassword("");

      // Désactiver la fonction "keep awake" lorsque vous avez terminé
      await deactivateKeepAwake();
      
      Alert.alert('Fonction "keep awake" activée avec succès.');
    } catch (error) {
      console.error("Erreur lors de l'activation de la fonction 'keep awake':", error);
      Alert.alert("Erreur lors de l'activation de la fonction 'keep awake'.");
    }
  }

  // Fonction pour basculer l'affichage du mot de passe
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Modifier Mot de Passe</Text>
      <Text>Saisissez votre nouveau mot de passe ici</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeOldPassword}
        value={oldPassword}
        placeholder="Ancien mot de passe"
        secureTextEntry={!showPassword} // Afficher/masquer le mot de passe en fonction de showPassword
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNewPassword}
        value={newPassword}
        placeholder="Nouveau mot de passe"
        secureTextEntry={!showPassword} // Afficher/masquer le mot de passe en fonction de showPassword
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeConfirmNewPassword}
        value={confirmNewPassword}
        placeholder="Confirmer Nouveau mot de passe"
        secureTextEntry={!showPassword} // Afficher/masquer le mot de passe en fonction de showPassword
      />
      <TouchableOpacity
        onPress={toggleShowPassword}
        style={styles.showPasswordButton}
      >
        <Text style={styles.showPasswordText}>
          {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onPressLearnMore}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Changer le mot de passe</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  showPasswordButton: {
    alignItems: 'flex-end',
    width: '80%',
    marginBottom: 10,
  },
  showPasswordText: {
    color: '#0983FF',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0983FF',
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TextInputExample;
