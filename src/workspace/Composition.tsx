import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Easing, Series } from 'remotion';

// ===========================================================================
// CONFIGURATION
// ===========================================================================
const THEME = {
    bg: '#0a0a0a',
    primary: '#CC0000', // American Red
    secondary: '#003366', // American Blue
    accent: '#FFFFFF',
    text: '#FFFFFF',
};

// ===========================================================================
// REUSABLE COMPONENTS
// ===========================================================================
const Background = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    
    return (
        <AbsoluteFill style={{ backgroundColor: THEME.bg }}>
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle at 50% 50%, ${THEME.secondary} 0%, ${THEME.bg} 100%)`,
                opacity: 0.4,
            }} />
            {/* Animated Grid */}
            <div style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                top: '-50%',
                left: '-50%',
                backgroundImage: `linear-gradient(${THEME.accent} 1px, transparent 1px), linear-gradient(90deg, ${THEME.accent} 1px, transparent 1px)`,
                backgroundSize: '100px 100px',
                opacity: 0.1,
                transform: `translateY(${(frame * 2) % 100}px) rotate(15deg)`,
            }} />
        </AbsoluteFill>
    );
};

const Title = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    const spr = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const opacity = interpolate(frame - delay, [0, 10], [0, 1]);
    const scale = interpolate(spr, [0, 1], [0.5, 1]);

    return (
        <div style={{
            opacity,
            transform: `scale(${scale})`,
            fontSize: 120,
            fontWeight: 900,
            color: THEME.text,
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            textShadow: `10px 10px 0px ${THEME.primary}`,
        }}>
            {text}
        </div>
    );
};

// ===========================================================================
// SCENES
// ===========================================================================

const Scene1 = () => {
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Title text="AMERICAN" />
            <Sequence from={15}>
                <Title text="SPORTS" delay={0} />
            </Sequence>
        </AbsoluteFill>
    );
};

const Scene2 = () => {
    const frame = useCurrentFrame();
    const { width } = useVideoConfig();
    const slide = interpolate(frame, [0, 15], [width, 0], { easing: Easing.bezier(0.25, 1, 0.5, 1), extrapolateRight: 'clamp' });
    
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ transform: `translateX(${slide}px)` }}>
               <Title text="FOOTBALL" />
            </div>
            <Sequence from={10}>
                 <div style={{ 
                    width: 400, 
                    height: 10, 
                    backgroundColor: THEME.primary,
                    marginTop: 20,
                    transform: `scaleX(${interpolate(frame - 10, [0, 15], [0, 1], {extrapolateRight: 'clamp'})})`
                 }} />
            </Sequence>
        </AbsoluteFill>
    );
};

const Scene3 = () => {
    const frame = useCurrentFrame();
    const scale = spring({ frame, fps: 30, config: { mass: 0.5 } });
    
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ transform: `scale(${scale})` }}>
                <Title text="BASKETBALL" />
            </div>
             <AbsoluteFill style={{ 
                border: `40px solid ${THEME.secondary}`,
                opacity: interpolate(frame, [0, 10], [0, 0.5]),
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};

const Scene4 = () => {
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Title text="BASEBALL" />
            <div style={{
                position: 'absolute',
                bottom: 200,
                fontSize: 40,
                color: THEME.accent,
                fontWeight: 'bold',
                backgroundColor: THEME.secondary,
                padding: '10px 40px',
                transform: 'rotate(-5deg)'
            }}>
                THE CLASSIC
            </div>
        </AbsoluteFill>
    );
};

const FinalScene = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 20], [0, 1]);
    
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity }}>
            <Title text="LEGENDS" />
            <Title text="BORN HERE" delay={10} />
            <div style={{
                marginTop: 60,
                fontSize: 50,
                color: THEME.primary,
                fontWeight: 'bold',
                letterSpacing: 10
            }}>
                USA
            </div>
        </AbsoluteFill>
    );
};

// ===========================================================================
// MAIN COMPOSITION
// ===========================================================================
export const MyComposition = () => {
    return (
        <AbsoluteFill>
            <Background />
            <Series>
                <Series.Sequence durationInFrames={60}>
                    <Scene1 />
                </Series.Sequence>
                <Series.Sequence durationInFrames={60}>
                    <Scene2 />
                </Series.Sequence>
                <Series.Sequence durationInFrames={60}>
                    <Scene3 />
                </Series.Sequence>
                <Series.Sequence durationInFrames={60}>
                    <Scene4 />
                </Series.Sequence>
                <Series.Sequence durationInFrames={120}>
                    <FinalScene />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};

