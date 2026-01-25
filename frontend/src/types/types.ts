/**
 * Type definitions for Moon Treatz application
 * =============================================
 */

/**
 * Props for the MenuItem component
 * ================================
 * Defines the structure for catering menu items displayed on the home page.
 * Each menu item represents a macaron box option with specific quantity, price, and available flavour choices.
 * 
 * @interface MenuItemProps
 * @property {number} quantity - The number of macarons included in this menu option
 * @property {number} price - The price in CAD for this menu option
 * @property {number} flavours - The number of different flavours customers can choose
 */
export type MenuItemProps = {
  quantity: number;
  price: number;
  flavours: number;
};

/**
 * Props for the FlavourCard component
 * ===================================
 * Defines the structure for individual macaron flavour cards displayed on the Flavours page.
 * Each card shows a specific macaron flavour with its image and description.
 * 
 * @interface FlavourCardProps
 * @property {number} id - Unique identifier for the flavour (used for filtering and React keys)
 * @property {string} name - Display name of the flavour (e.g., "Vanilla", "Chocolate")
 * @property {string} src - Relative path to the flavour's image
 * @property {string} description - Detailed description of the flavour's characteristics and filling
 */
export type FlavourCardProps = {
  id: number;
  name: string;
  src: string;
  description: string;
};

/**
 * Props for the WeeklyGallery component
 * =====================================
 * Defines the structure for weekly special macaron box entries displayed in the gallery carousel.
 * Each entry represents a past weekly special with multiple photo views (box view, side view, top view).
 * 
 * @interface WeeklyFlavour
 * @property {number} id - Unique identifier for the weekly special (used for navigation and React keys)
 * @property {string[]} flavours - Array of individual flavour names for this week's box
 * @property {string} displayImage - Transparent cutout image path for home page WeeklyBox display
 * @property {string[]} images - Array of image paths showing different angles (box-view, side-view, top-view)
 */
export type WeeklyFlavour = {
  id: number;
  flavours: string[];
  displayImage: string;
  images: string[];
};

/**
 * Butterfly Decoration Configuration
 * ==================================
 * Defines the structure for butterfly decoration objects used in the home page.
 * Butterflies follow animated trails with configurable delays and positions.
 * 
 * @interface ButterflyDecor
 * @property {string} className - CSS class for positioning the butterfly
 * @property {number} delay - Animation delay in seconds
 * @property {number[]} xValues - Array of x-coordinate values for animation path
 */
export type ButterflyDecor = {
  className: string;
  delay: number;
  xValues: number[];
};

/**
 * Cloud Decoration Configuration
 * =============================
 * Defines the structure for cloud decoration objects with framer-motion animation properties.
 * Clouds float with scale and rotation animations.
 * 
 * @interface CloudDecor
 * @property {string} src - Path to the cloud image asset
 * @property {string} className - CSS class for positioning the cloud
 * @property {object} animate - Framer Motion animation values
 * @property {number[]} animate.scaleX - Horizontal scale keyframes
 * @property {number[]} animate.scaleY - Vertical scale keyframes
 * @property {number[]} animate.rotate - Rotation angle keyframes
 * @property {object} transition - Framer Motion transition configuration
 * @property {number} transition.duration - Animation duration in seconds
 * @property {number} transition.repeat - Number of animation repeats (Infinity for infinite)
 * @property {number[]} transition.ease - Easing function
 * @property {number} [transition.delay] - Snimation start delay
 */
export type CloudDecor = {
  src: string;
  className: string;
  animate: {
    scaleX: number[];
    scaleY: number[];
    rotate: number[];
  };
  transition: {
    duration: number;
    repeat: number;
    ease: number[];
    delay?: number;
  };
};

/**
 * Macaron Decoration Configuration
 * ===============================
 * Defines the structure for macaron decoration objects with framer-motion animation properties.
 * Macarons float with vertical/horizontal movement, rotation, and scaling.
 * 
 * @interface MacaronDecor
 * @property {string} src - Path to the macaron image asset
 * @property {string} className - CSS class for positioning the macaron
 * @property {object} animate - Framer Motion animation values
 * @property {number[]} animate.y - Vertical position keyframes
 * @property {number[]} animate.x - Horizontal position keyframes
 * @property {number[]} animate.rotate - Rotation angle keyframes
 * @property {number[]} animate.scale - Scale keyframes
 * @property {object} transition - Framer Motion transition configuration
 * @property {number} transition.duration - Animation duration in seconds
 * @property {number} transition.repeat - Number of animation repeats (Infinity for infinite)
 * @property {string} transition.ease - Easing function
 * @property {number} [transition.delay] - Optional animation start delay
 */
export type MacaronDecor = {
  src: string;
  className: string;
  animate: {
    y: number[];
    x: number[];
    rotate: number[];
    scale: number[];
  };
  transition: {
    duration: number;
    repeat: number;
    ease: string;
    delay?: number;
  };
};

/**
 * Sparkle Decoration Configuration
 * ===============================
 * Defines the structure for sparkle decoration objects with framer-motion animation properties.
 * Sparkles twinkle with opacity and scale animations.
 * 
 * @interface SparkleDecor
 * @property {string} className - CSS class for positioning the sparkle
 * @property {string} character - The sparkle character to display (e.g., '✦', '✧')
 * @property {object} animate - Framer Motion animation values
 * @property {number[]} animate.opacity - Opacity keyframes (0-1)
 * @property {number[]} animate.scale - Scale keyframes
 * @property {object} transition - Framer Motion transition configuration
 * @property {number} transition.duration - Animation duration in seconds
 * @property {number} transition.repeat - Number of animation repeats (Infinity for infinite)
 * @property {string} transition.ease - Easing function
 * @property {number} transition.delay - Animation start delay
 */
export type SparkleDecor = {
  className: string;
  character: string;
  animate: {
    opacity: number[];
    scale: number[];
  };
  transition: {
    duration: number;
    repeat: number;
    ease: string;
    delay: number;
  };
};
