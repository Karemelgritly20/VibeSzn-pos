import { gql } from "@apollo/client";

export const GET_ITEMS_QUERY = gql`
  query getItems(
    $page: Int
    $storeId: Int!
    $stationId: Int!
    $searchInput: String
  ) {
    getItems(
      input: {
        station_id: $stationId
        store_id: 1000000
        store_front_id: $storeId
        filters: { item_name: $searchInput }
      }
      first: 12
      page: $page
    ) {
      paginatorInfo {
        count
        currentPage
        total
        lastPage
      }
      data {
        id
        name
        price
        quantity
        is_backorder
        image_url {
          small
        }
      }
    }
  }
`;

export const GET_ITEMS_COMBINATIONS = gql`
  query getItemCombinations($item_id: Int, $stationId: Int!, $storeId: Int!) {
    getItemCombinations(
      item_id: $item_id
      input: {
        store_id: 1000000
        station_id: $stationId
        store_front_id: $storeId
      }
    ) {
      id
      name
      price
      is_backorder
      image_url {
        small
      }
      available_combinations {
        attribute_option_data
        parsed_attribute_option_data
        quantity
      }
      item_attributes {
        attr_id
        attr_type
        attr_name
        attr_option_id
        attr_option_name
        attr_option_value
        free_characters
        max_characters
        price_per_extra_character
      }
    }
  }
`;

export const GET_STORES = gql`
  query {
    storeFronts(store_id: 1000000) {
      id
      name
      is_active
    }
  }
`;

export const GET_STATION = gql`
  query getStations($storeId: Int!) {
    getStations(store_front_id: $storeId) {
      id
      name
      status
    }
  }
`;
