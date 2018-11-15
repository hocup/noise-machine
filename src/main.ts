let freqInput: FrequencyCanvas;


function mainStart() {
    // Prep the canvas
    freqInput = new FrequencyCanvas("frequencyInput");

    const numFreq = 120000;

    let frequencies: [Float32Array, Float32Array] = [
        new Float32Array(numFreq),
        new Float32Array(numFreq)
    ];

    freqInput.getFrequencies(frequencies);

    frequencies[0][0] = 0;
    frequencies[1][0] = 0;

    // Prep the audio setup
    let audioContext: AudioContext = new AudioContext();
    let osc = audioContext.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(0.25, audioContext.currentTime);

    var wave = audioContext.createPeriodicWave(frequencies[0], frequencies[1], {disableNormalization: false});

    osc.setPeriodicWave(wave);

    osc.connect(audioContext.destination);

    osc.start();
    osc.stop(12);

}