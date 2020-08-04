#!/usr/bin/env python
import librosa
from flask import Flask, request, jsonify, Response
import os
from flask_cors import CORS
import IPython.display as ipd
import numpy as np
import warnings
import random
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from tensorflow.keras.layers import Dense, Dropout, Flatten, Conv1D, Input, MaxPooling1D
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from tensorflow.keras import backend as K
import sounddevice as sd
import soundfile as sf
warnings.filterwarnings("ignore")

voiceReko = Flask(__name__)
CORS(voiceReko)

#
# path = /Users/skgurram/Desktop/Hackathon/Speech Recognition/
train_audio_path = '/Users/skgurram/Desktop/Hackathon/Speech Recognition/audio/train'
samples, sample_rate = librosa.load(train_audio_path+'/zero/0b09edd3_nohash_0.wav', sr = 16000)
#
#
ipd.Audio(samples, rate=sample_rate)
samples = librosa.resample(samples, sample_rate, 8000)
ipd.Audio(samples, rate=8000)

labels=os.listdir(train_audio_path)
no_of_recordings=[]
for label in labels:
    waves = [f for f in os.listdir(train_audio_path + '/'+ label+ '/') if f.endswith('.wav')]
    no_of_recordings.append(len(waves))
print(len(no_of_recordings))
print('No recordings')
print('Waves')
print(len(waves))
all_wave = []
all_label = []
for label in labels:
    print(label)
    waves = [f for f in os.listdir(train_audio_path + '/'+ label+ '/') if f.endswith('.wav')]
    for wav in waves:
        samples, sample_rate = librosa.load(train_audio_path + '/' + label + '/' + wav, sr = 16000)
        samples = librosa.resample(samples, sample_rate, 8000)
        if(len(samples)== 8000) :
            all_wave.append(samples)
            all_label.append(label)

print('Samples')
print(len(samples))
le = LabelEncoder()
y=le.fit_transform(all_label)
classes= list(le.classes_)
#
#
#
y= tf.keras.utils.to_categorical(y, num_classes=len(labels))
all_wave = np.array(all_wave).reshape(-1,8000,1)
print('y size ' )
print(y)

print('nparray - all waves')
print(len((all_wave)))
#
x_tr, x_val, y_tr, y_val = train_test_split(np.array(all_wave),np.array(y),stratify=y,test_size = 0.2,random_state=0,shuffle=True)

print(len(x_tr))

#

K.clear_session()
inputs = Input(shape=(8000,1))
print(inputs)

conv = Conv1D(8,13, padding='valid', activation='relu', strides=1)(inputs)
conv = MaxPooling1D(3)(conv)
conv = Dropout(0.3)(conv)

conv = Conv1D(16, 11, padding='valid', activation='relu', strides=1)(conv)
conv = MaxPooling1D(3)(conv)
conv = Dropout(0.3)(conv)

conv = Conv1D(32, 9, padding='valid', activation='relu', strides=1)(conv)
conv = MaxPooling1D(3)(conv)
conv = Dropout(0.3)(conv)

conv = Conv1D(64, 7, padding='valid', activation='relu', strides=1)(conv)
conv = MaxPooling1D(3)(conv)
conv = Dropout(0.3)(conv)

conv = Conv1D(128, 5, padding='valid', activation='relu', strides=1)(conv)
conv = MaxPooling1D(3)(conv)
conv = Dropout(0.3)(conv)

conv = Conv1D(256, 3, padding='valid', activation='relu', strides=1)(conv)
conv = MaxPooling1D(3)(conv)

conv = Flatten()(conv)

conv = Dense(256, activation='relu')(conv)
conv = Dropout(0.3)(conv)

conv = Dense(128, activation='relu')(conv)
conv = Dropout(0.3)(conv)

outputs = Dense(len(labels), activation='softmax')(conv)

print('Inputs')
print(inputs)
print(outputs)
model = Model(inputs, outputs)
model.summary()

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
# es = EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=10, min_delta=0.0001)
# mc = ModelCheckpoint('voice_reko.hdf5', monitor='val_acc', verbose=1, save_best_only=True, mode='max')

#
# In[13]:
#
#
# history = model.fit(x_tr, y_tr, epochs=1, callbacks=[es, mc], batch_size=32, validation_data=(x_val, y_val))
print(len(x_val))
print("X list")
print(len(y_val))
print("Y list")
history = model.fit(x_tr, y_tr ,epochs=1, batch_size=32, validation_data=(x_val,y_val))


# In[14]:
def predict(audio):
    prob=model.predict(audio.reshape(1,8000,1))
    index=np.argmax(prob[0])
    return classes[index]


# In[24]:

@voiceReko.route('/predictRandom', methods=['GET'])
def predictRandom():
    index = random.randint(0, len(x_val) - 1)
    samples = x_val[index].ravel()
    print("Actual Audio:", classes[np.argmax(y_val[index])])
    ipd.Audio(samples, rate=8000)
    print("Predict in Text:", predict(samples))
    return predict(samples)


@voiceReko.route('/predictVoice', methods=['POST'])
def predictVoice():
    samplerate = 16000
    duration = 1
    filename = 'shravan_test.wav'
    print("start")
    mydata = sd.rec(int(samplerate * duration), samplerate=samplerate,
                    channels=1, blocking=True)
    print("end")
    sd.wait()
    sf.write(filename, mydata, samplerate)

    filepath = filename

    # reading the voice commands
    samples, sample_rate = librosa.load('shravan_test.wav', sr=16000)
    samples = librosa.resample(samples, sample_rate, 8000)
    ipd.Audio(samples, rate=8000)
    print("Prediction")
    prediction = predict(samples)
    print(prediction)
    return prediction


if __name__ == "__main__":
    voiceReko.run(port=9090)
