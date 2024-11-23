export const ReelsConstants = {
    COUNT_REELS: 1, // you can change this constant to expand slot machine
    COUNT_LINES: 3,
    EXTRA_LINES: 1,

    TILE_HEIGHT: 130,
    TILE_WIDTH: 130,
    TILE_GAP: 0,
    REEL_GAP: 0,

    PER_REEL_STOPPING_DELAY: 150,
    FORCE_PER_REEL_STOPPING_DELAY: 0,

    MIN_SPIN_DURATION: 3000,

    speed: {
        STARTING_DURATION: 0.4,
        SPINNING_DURATION: 0.08,
        STOPPING_DURATION: 0.08,
        FORCE_STOPPING_DURATION: 0.02,

        FINAL_PRE_BOUNCE_TILE_DURATION: 0.0065,
        FINAL_BOUNCE_TILE_DURATION: 0.5,

        ROLLING_OUT_PERCENT: 0.1,
    },

    TILE_ANIMATION_DURATION: 0.3
};