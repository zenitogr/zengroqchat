const getPeakLevel = (analyzer: AnalyserNode) => {
    const array = new Uint8Array(analyzer.fftSize);
    analyzer.getByteTimeDomainData(array);
    return (
      array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) /
      128
    );
  };
  
  export const createMediaStream = (stream: MediaStream, callback?: (arg0: number) => void, isRecording?: any ) => {
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const analyzer = context.createAnalyser();
    source.connect(analyzer);
    const tick = () => {
      const peak = getPeakLevel(analyzer);
      if (isRecording) {
        if (callback) {
        callback(peak);
        }
        requestAnimationFrame(tick);
      }
    };
    tick();
  };
  