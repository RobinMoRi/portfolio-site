// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type AboutmeDocumentDataSlicesSlice = TextBlockSlice;

/**
 * Content for AboutMe documents
 */
interface AboutmeDocumentData {
  /**
   * Slice Zone field in *AboutMe*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: aboutme.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<AboutmeDocumentDataSlicesSlice> /**
   * Meta Title field in *AboutMe*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: aboutme.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *AboutMe*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: aboutme.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *AboutMe*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: aboutme.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * AboutMe document from Prismic
 *
 * - **API ID**: `aboutme`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutmeDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<AboutmeDocumentData>,
    "aboutme",
    Lang
  >;

/**
 * Item in *ReusableExperience → skills*
 */
export interface ReusableexperienceDocumentDataSkillsItem {
  /**
   * skill field in *ReusableExperience → skills*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: reusableexperience.skills[].skill
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  skill: prismic.KeyTextField;
}

/**
 * Content for ReusableExperience documents
 */
interface ReusableexperienceDocumentData {
  /**
   * title field in *ReusableExperience*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: reusableexperience.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * description field in *ReusableExperience*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: reusableexperience.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * start field in *ReusableExperience*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: reusableexperience.start
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  start: prismic.DateField;

  /**
   * end field in *ReusableExperience*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: reusableexperience.end
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  end: prismic.DateField;

  /**
   * active field in *ReusableExperience*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: reusableexperience.active
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  active: prismic.BooleanField;

  /**
   * skills field in *ReusableExperience*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: reusableexperience.skills[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  skills: prismic.GroupField<
    Simplify<ReusableexperienceDocumentDataSkillsItem>
  >;

  /**
   * institute field in *ReusableExperience*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: reusableexperience.institute
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  institute: prismic.KeyTextField;

  /**
   * location field in *ReusableExperience*
   *
   * - **Field Type**: GeoPoint
   * - **Placeholder**: *None*
   * - **API ID Path**: reusableexperience.location
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#geopoint
   */
  location: prismic.GeoPointField;
}

/**
 * ReusableExperience document from Prismic
 *
 * - **API ID**: `reusableexperience`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ReusableexperienceDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ReusableexperienceDocumentData>,
    "reusableexperience",
    Lang
  >;

export type AllDocumentTypes = AboutmeDocument | ReusableexperienceDocument;

/**
 * Primary content in *TextBlock → Default → Primary*
 */
export interface TextBlockSliceDefaultPrimary {
  /**
   * TextBlock field in *TextBlock → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: text_block.default.primary.textblock
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  textblock: prismic.RichTextField;
}

/**
 * Default variation for TextBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextBlockSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<TextBlockSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *TextBlock*
 */
type TextBlockSliceVariation = TextBlockSliceDefault;

/**
 * TextBlock Shared Slice
 *
 * - **API ID**: `text_block`
 * - **Description**: TextBlock
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextBlockSlice = prismic.SharedSlice<
  "text_block",
  TextBlockSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      AboutmeDocument,
      AboutmeDocumentData,
      AboutmeDocumentDataSlicesSlice,
      ReusableexperienceDocument,
      ReusableexperienceDocumentData,
      ReusableexperienceDocumentDataSkillsItem,
      AllDocumentTypes,
      TextBlockSlice,
      TextBlockSliceDefaultPrimary,
      TextBlockSliceVariation,
      TextBlockSliceDefault,
    };
  }
}
