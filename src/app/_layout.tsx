
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Stack } from "expo-router";
import { PaperProvider, Searchbar, Icon } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
};

const categories = ["All", "Chair", "Sofa", "Table", "Lamp"];

const products: Product[] = [
  {
    id: 1,
    name: "Modern Chair",
    price: 120,
    rating: 4.8,
    category: "Chair",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=500",
  },
  {
    id: 2,
    name: "Modern Sofa",
    price: 350,
    rating: 4.9,
    category: "Sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
  },
  {
    id: 3,
    name: "Wooden Table",
    price: 180,
    rating: 4.7,
    category: "Table",
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500",
  },
  {
    id: 4,
    name: "Table Lamp",
    price: 75,
    rating: 4.6,
    category: "Lamp",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
  },
  {
    id: 5,
    name: "Classic Chair",
    price: 145,
    rating: 4.8,
    category: "Chair",
    image:
      "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=500",
  },
  {
    id: 6,
    name: "Luxury Sofa",
    price: 420,
    rating: 4.9,
    category: "Sofa",
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500",
  },
  {
    id: 7,
    name: "Coffee Table",
    price: 210,
    rating: 4.7,
    category: "Table",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500",
  },
  {
    id: 8,
    name: "Modern Lamp",
    price: 95,
    rating: 4.5,
    category: "Lamp",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
  },
];

export default function Layout() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <PaperProvider>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.logo}>
              <Icon source="view-grid" size={21} color="#70452F" />
            </TouchableOpacity>

            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
              }}
              style={styles.avatar}
            />
          </View>

          {/* Heading */}
          <Text style={styles.heading}>
            Find unique furniture{"\n"}for your home
          </Text>

          {/* Search */}
          <View style={styles.searchRow}>
            <Searchbar
              placeholder="Search furniture..."
              value={search}
              onChangeText={setSearch}
              style={styles.search}
              inputStyle={styles.searchInput}
              iconColor="#666666"
              elevation={0}
            />

            <TouchableOpacity style={styles.filter}>
              <MaterialCommunityIcons
                name="tune-variant"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {/* Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerSmall}>Up to</Text>

              <Text style={styles.bannerTitle}>40% Discount!</Text>

              <Text style={styles.bannerDescription}>
                On selected furniture
              </Text>

              <TouchableOpacity style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
              }}
              style={styles.bannerImage}
              resizeMode="contain"
            />
          </View>

          {/* Popular Items */}
          <View style={styles.popularHeader}>
            <Text style={styles.popularTitle}>Popular Items</Text>

            <TouchableOpacity
              onPress={() => setSelectedCategory("All")}
            >
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Categories */}
          
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  decelerationRate="fast"
  snapToAlignment="start"
  contentContainerStyle={styles.categories}
>
  {categories.map((category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.category,
        selectedCategory === category && styles.categoryActive,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.categoryActiveText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>

          {/* Products */}
          <View style={styles.products}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <View style={styles.productCard} key={product.id}>
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />

                    {/* Static Heart Icon */}
                    <View style={styles.heartButton}>
                      <MaterialCommunityIcons
                        name="heart-outline"
                        size={21}
                        color="#8D5237"
                      />
                    </View>
                  </View>

                  <Text style={styles.productName}>
                    {product.name}
                  </Text>

                  <View style={styles.productBottom}>
                    <Text style={styles.productPrice}>
                      ${product.price.toFixed(2)}
                    </Text>

                    <Text style={styles.productRating}>
                      ★ {product.rating}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons
                  name="package-variant"
                  size={45}
                  color="#BBBBBB"
                />

                <Text style={styles.emptyText}>
                  No products found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 45,
  },

  header: {
    height: 43,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },

  logo: {
    width: 39,
    height: 39,
    backgroundColor: "#D5D5D5",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: "#E9DED5",
  },

  heading: {
    fontSize: 25,
    lineHeight: 29,
    fontWeight: "700",
    letterSpacing: -0.7,
    color: "#171717",
    marginBottom: 17,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  search: {
    flex: 1,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#EEEEEE",
  },

  searchInput: {
    fontSize: 12,
    minHeight: 0,
  },

  filter: {
    width: 43,
    height: 43,
    borderRadius: 11,
    backgroundColor: "#8D5237",
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    height: 145,
    backgroundColor: "#202020",
    borderRadius: 18,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  bannerContent: {
    flex: 1.2,
    paddingLeft: 15,
    zIndex: 1,
  },

  bannerSmall: {
    color: "#D0D0D0",
    fontSize: 11,
    marginBottom: 2,
  },

  bannerTitle: {
    color: "#D7B394",
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 5,
  },

  bannerDescription: {
    color: "#D0D0D0",
    fontSize: 10,
    marginBottom: 11,
  },

  shopButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    height: 31,
    borderRadius: 9,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },

  shopButtonText: {
    color: "#222222",
    fontSize: 11,
    fontWeight: "600",
  },

  bannerImage: {
    flex: 0.9,
    height: "95%",
    marginRight: 4,
    borderRadius: 13,
  },

  popularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },

  popularTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#171717",
  },

  viewAll: {
    fontSize: 12,
    color: "#8D5237",
    fontWeight: "600",
  },

  categories: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  paddingRight: 20,
  paddingVertical: 5,
},

category: {
  backgroundColor: "#F5F5F5",
  paddingHorizontal: 22,
  paddingVertical: 12,
  borderRadius: 25,
},

categoryActive: {
  backgroundColor: "#8D5237",
},

categoryText: {
  color: "#555",
  fontSize: 13,
  fontWeight: "600",
},

categoryActiveText: {
  color: "#FFF",
},

  products: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
    paddingBottom: 30,
  },

  productCard: {
    width: "48%",
  },

  productImageContainer: {
    height: 165,
    backgroundColor: "#F5F3F0",
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  heartButton: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
    marginTop: 9,
  },

  productBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },

  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8D5237",
  },

  productRating: {
    fontSize: 11,
    color: "#777777",
  },

  emptyContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    color: "#888888",
    fontSize: 14,
    marginTop: 10,
  },
});
