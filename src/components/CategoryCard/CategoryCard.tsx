import React, { useState, ReactNode, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
} from 'react-native';

interface CCProps {
  title: string;
  children: ReactNode;
  verticalBarColor: string;
  selected: boolean;
  onPress: Function;
  id: Number;
}

export default function CategoryCard({
  title,
  children,
  verticalBarColor,
  selected,
  onPress,
  id,
}: CCProps) {
  const [maxHeight] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState<Boolean>(false);

  useEffect(() => {
    setExpanded(selected);
  }, [selected]);

  useEffect(() => {
    if (expanded) {
      Animated.timing(maxHeight, {
        toValue: 200,
        duration: 200,
      }).start();
    } else {
      Animated.timing(maxHeight, {
        toValue: 0,
        duration: 200,
      }).start();
    }
  }, [expanded]);

  const handleOnpPress = () => {
    if (expanded) setExpanded(false);
    else if (selected) setExpanded(true);
    else onPress(id);
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[
          { ...styles.title, borderLeftColor: verticalBarColor },
          expanded && styles.title_expand,
        ]}
        underlayColor={'transparent'}
        onPress={() => handleOnpPress()}
      >
        <Text style={expanded ? styles.titleText_expand : styles.titleText}>
          {title}
        </Text>
      </TouchableHighlight>

      <Animated.View style={{ ...styles.listContainer, maxHeight }}>
        {children}
        {/* <Image style={styles.image} source={backgroungImage} /> */}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderTopWidth: 0,
    // borderColor: '#d7d7d7',
    maxHeight: 0,
    overflow: 'hidden',
    // marginVertical: 20,
  },
  title: {
    padding: 5,
    borderLeftWidth: 15,
    backgroundColor: '#d7d7d7',
    // marginVertical: 20,
  },
  title_expand: {
    marginBottom: 20,
    borderLeftWidth: 20,
    backgroundColor: '#fff',
  },
  titleText: {
    paddingVertical: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#747474',
  },
  titleText_expand: {
    fontSize: 40,
    color: 'coral',
  },
  container: {
    marginVertical: 5,
  },
  image: {
    resizeMode: 'contain',
  },
});
