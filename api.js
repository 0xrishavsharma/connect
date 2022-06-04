import { createClient } from "urql";

const API_URL = "https://api.lens.dev";

export const client = createClient({
    url: API_URL
})

export const getProfile = `
    query Profiles(
        $id: ProfileId!
    ) {
        profiles(request: { profileIds: [$id], limit: 1 }) {
        items {
            id
            name
            bio
            attributes {
            displayType
            traitType
            key
            value
            }
            metadata
            isDefault
            picture {
            ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
            }
            ... on MediaSet {
                original {
                url
                mimeType
                }
            }
            __typename
            }
            handle
            coverPicture {
            ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
            }
            ... on MediaSet {
                original {
                url
                mimeType
                }
            }
            __typename
            }
            ownedBy
            dispatcher {
            address
            canUseRelay
            }
            stats {
            totalFollowers
            totalFollowing
            totalPosts
            totalComments
            totalMirrors
            totalPublications
            totalCollects
            }
            followModule {
            ... on FeeFollowModuleSettings {
                type
                amount {
                asset {
                    symbol
                    name
                    decimals
                    address
                }
                value
                }
                recipient
            }
            ... on ProfileFollowModuleSettings {
            type
            }
            ... on RevertFollowModuleSettings {
            type
            }
            }
        }
        pageInfo {
            prev
            next
            totalCount
        }
        }
    }

`

export const recommendedProfiles = `
    query RecommendedProfiles {
        recommendedProfiles {
            id
            name
            bio
            attributes {
            displayType
            traitType
            key
            value
            }
            metadata
            isDefault
            picture {
            ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
            }
            ... on MediaSet {
                original {
                url
                mimeType
                }
            }
            __typename
            }
            handle
            coverPicture {
            ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
            }
            ... on MediaSet {
                original {
                url
                mimeType
                }
            }
            __typename
            }
            ownedBy
            dispatcher {
            address
            canUseRelay
            }
            stats {
            totalFollowers
            totalFollowing
            totalPosts
            totalComments
            totalMirrors
            totalPublications
            totalCollects
            }
            followModule {
            ... on FeeFollowModuleSettings {
                type
                amount {
                asset {
                    symbol
                    name
                    decimals
                    address
                }
                value
                }
                recipient
            }
            ... on ProfileFollowModuleSettings {
            type
            }
            ... on RevertFollowModuleSettings {
            type
            }
            }
        }
    }
`