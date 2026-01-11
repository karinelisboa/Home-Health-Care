import React, { ReactNode } from 'react';
import { Dimensions, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';


interface CardAutenticacaoProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>; 
}

const { height } = Dimensions.get('window');

export function CardAutenticacao({ children, style }: CardAutenticacaoProps) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    minHeight: height * 0.35,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    
    elevation: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -5 },
    
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});