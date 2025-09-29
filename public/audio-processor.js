// audio-processor.js
class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.desiredSampleRate = 16000; // Desired output sample rate
    this.bufferSize = 2048;
    this.audioBuffer = new Float32Array(this.bufferSize);
    this.bufferIndex = 0;
  }

  // process() is called whenever the browser needs new audio data.
  // For recording, we focus on the 'inputs'.
  process(inputs, outputs, parameters) {
    // inputs[0] refers to the first input connected to the node.
    // inputs[0][0] refers to the first channel of the first input.
    const inputChannelData = inputs[0]?.[0]; // Use optional chaining for safety

    // Check if there's valid input data
    if (
      inputChannelData instanceof Float32Array &&
      inputChannelData.length > 0
    ) {
      // * For each audio data chunk we receive, we will store it in the audioBuffer until full
      // * Once full, we will send it to the main thread for processing
      // * and any remaining data will be stored in the audioBuffer for the next iteration

      let remainingData = inputChannelData;
      while (remainingData.length > 0) {
        // Determine how much space is left in the buffer
        const spaceInBuffer = this.bufferSize - this.bufferIndex;

        // Take only the portion that fits in the current buffer
        const chunk = remainingData.slice(0, spaceInBuffer);

        // Append the chunk to the internal audio buffer
        this.audioBuffer.set(chunk, this.bufferIndex);
        this.bufferIndex += chunk.length;

        // If the buffer is full, downsample and send it to the main thread
        if (this.bufferIndex === this.bufferSize) {
          const downsampled = this.downsampleBuffer(
            this.audioBuffer,
            sampleRate,
            this.desiredSampleRate
          );

          // Send the downsampled buffer to the main thread
          // Transfer the underlying ArrayBuffer to avoid copying
          // This is crucial for performance, as it avoids copying the buffer
          this.port.postMessage(downsampled, [downsampled.buffer]);

          // Reset buffer index for next batch
          this.bufferIndex = 0;
        }

        // Remove the processed chunk from the remaining data
        remainingData = remainingData.slice(chunk.length);
      }
    }

    // Return true to keep the processor alive.
    // If you return false, it will be garbage collected.
    return true;
  }

  downsampleBuffer(buffer, inputSampleRate, outputSampleRate) {
    if (inputSampleRate === outputSampleRate) {
      // If no resampling is needed, return a copy of the buffer
      return new Float32Array(buffer);
    }
    if (inputSampleRate < outputSampleRate) {
      throw new Error(
        "Input sample rate must be greater than output sample rate"
      );
    }

    const sampleRateRatio = inputSampleRate / outputSampleRate;
    const outputLength = Math.floor(buffer.length / sampleRateRatio);
    const result = new Float32Array(outputLength);
    let outputIndex = 0;
    let inputIndex = 0;

    while (outputIndex < outputLength) {
      // Calculate the precise fractional index in the input buffer
      const theoreticalInputIndex = inputIndex;

      // Find the two nearest input samples
      const index1 = Math.floor(theoreticalInputIndex);
      const index2 = index1 + 1;

      // Calculate the interpolation fraction
      const fraction = theoreticalInputIndex - index1;

      // Get the input sample values, handle edge case for the last sample
      const value1 = buffer[index1];
      const value2 = index2 < buffer.length ? buffer[index2] : buffer[index1]; // Use last sample if index2 is out of bounds

      // Linear interpolation
      result[outputIndex] = value1 + (value2 - value1) * fraction;

      // Move to the next output sample position in the input buffer space
      inputIndex += sampleRateRatio;
      outputIndex++;
    }

    return result;
  }
}

registerProcessor("audio-processor", AudioProcessor);
