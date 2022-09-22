import React, {useContext, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from '@src/context/AuthContext';
import {useGetUserListsQuery} from '@src/services/lists.service';
import ColorList from '@src/styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import {setActiveList} from '@src/store/lists';
import Product from '@src/components/Product';
import DrawerContent from '@src/components/DrawerContent';
import BaseLayout from '@src/components/BaseLayout';
import Typography from '@src/components/Typography';
import FontList from '@src/styles/fonts';
import {useGetCategoriesQuery} from '@src/services/categories.service';

type RootStackParamList = {
  HomeNav: {list?: IList};
};

type Props = NativeStackScreenProps<RootStackParamList, 'HomeNav'>;

const Drawer = createDrawerNavigator();

const HomeNav: React.FC<Props> = ({route}) => {
  const list = route.params?.list;
  const {data: categories, isLoading: categoriesLoading} =
    useGetCategoriesQuery();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!list) {
      return;
    }

    setActiveList(list.id);

    // Subscribe to product changes in real time
    const subscriber = firestore()
      .collection(`shopping-lists/${list.id}/products`)
      .orderBy('createdAt', 'asc')
      .onSnapshot(collectionSnap => {
        const items: Product[] = [];

        collectionSnap.forEach(doc => {
          items.push({...doc.data()} as Product);
        });

        setProducts(items);
      });

    // Unsubscribe from changes
    return () => subscriber();
  }, [list]);

  return (
    <BaseLayout>
      <View>
        <Text className="text-black text-center">
          We are previewing a list ... of a sort {list && list.name} and we have
          a list of #{products.length} products
        </Text>
        <Typography className="text-center">
          Look at me, we're the Typography now
        </Typography>
        <Typography font="headerTitle">Ръкописен шрифт</Typography>
        <Typography font="headerTitle">Handwritten text</Typography>
      </View>
      <Typography className="text-2xl">Категории</Typography>
      <View>
        {categoriesLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          categories?.map(category => (
            <Typography key={category.id}>{category.name}</Typography>
          ))
        )}
      </View>
      <View className="my-4">
        <Text className="text-center">================ #{products.length}</Text>
      </View>
      {products.map(product => (
        <Product
          name={product.name}
          note={product.notes}
          complete={product.isCompleted}
          key={product.productId}
        />
      ))}
    </BaseLayout>
  );
};

const DrawerStack = () => {
  const auth = useContext(AuthContext);
  const {data: lists = [], isLoading} = useGetUserListsQuery(auth.user?.uid);

  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => navigation.openDrawer()}
            className="px-3">
            <Icon name="menu" size={25} color={ColorList.white} />
          </TouchableOpacity>
        ),
        headerTintColor: ColorList.light,
        headerStyle: {
          elevation: 0,
          backgroundColor: ColorList.darkBlue,
        },
        headerTitleStyle: {
          fontFamily: FontList.headerTitle,
          fontSize: 25,
        },
        headerTitleAlign: 'center',
        drawerStyle: {
          width: Dimensions.get('window').width,
          margin: 0,
          padding: 0,
          elevation: 0,
        },
        drawerItemStyle: {
          marginHorizontal: 0,
        },
      })}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeNav" component={HomeNav} />
      {!isLoading &&
        lists.map(list => (
          <Drawer.Screen
            name={list.id}
            key={list.id}
            component={HomeNav}
            options={{drawerLabel: list.name, headerTitle: list.name}}
            initialParams={{list}}
          />
        ))}
    </Drawer.Navigator>
  );
};

export default DrawerStack;
