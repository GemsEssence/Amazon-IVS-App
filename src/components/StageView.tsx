import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { requireNativeComponent, UIManager, findNodeHandle } from 'react-native';

const NativeStageView = requireNativeComponent('StageView');

export interface StageViewRef {
  flipCamera: () => void;
  toggleAudio: (isMuted: boolean) => void;
}

const StageView = forwardRef<StageViewRef, any>((props, ref) => {
  const viewRef = useRef(null);

  useImperativeHandle(ref, () => ({
    flipCamera: () => {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(viewRef.current),
        UIManager.getViewManagerConfig('StageView').Commands.flipCamera,
        []
      );
    },
    toggleAudio: (isMuted: boolean) => {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(viewRef.current),
        UIManager.getViewManagerConfig('StageView').Commands.toggleAudio,
        [isMuted]
      );
    },
  }));

  return <NativeStageView ref={viewRef} {...props} />;
});

export default StageView;