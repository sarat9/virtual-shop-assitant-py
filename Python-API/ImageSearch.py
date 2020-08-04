from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import numpy as np
import os
from PIL import Image
from tensorflow.keras.preprocessing import image
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

imageReko = Flask(__name__)
CORS(imageReko)

train_datagen = ImageDataGenerator(rescale=1. / 255,
                                   shear_range=0.2,
                                   zoom_range=0.2,
                                   horizontal_flip=True)
n_classes = 2

print(os.listdir('/Users/skgurram/Desktop/Hackathon/Speech Recognition/dataset/training_set'))
# path = os.path.join(images_path, filename)
training_set = train_datagen.flow_from_directory('/Users/skgurram/Desktop/Hackathon/Speech Recognition/dataset/training_set',
                                                 target_size=(64, 64),
                                                 batch_size=32,
                                                 class_mode='categorical')

# In[4]:


test_datagen = ImageDataGenerator(rescale=1. / 255)
test_set = test_datagen.flow_from_directory('/Users/skgurram/Desktop/Hackathon/Speech Recognition/dataset/test_set',
                                            target_size=(64, 64),
                                            batch_size=32,
                                            class_mode='categorical')

# In[5]:


cnn = tf.keras.models.Sequential()

# In[6]:


cnn.add(tf.keras.layers.Conv2D(filters=32, kernel_size=3, activation='relu', input_shape=[64, 64, 3]))

# In[7]:


cnn.add(tf.keras.layers.MaxPool2D(pool_size=2, strides=2))

# In[8]:


cnn.add(tf.keras.layers.Conv2D(filters=32, kernel_size=3, activation='relu'))
cnn.add(tf.keras.layers.MaxPool2D(pool_size=2, strides=2))

# In[9]:


cnn.add(tf.keras.layers.Conv2D(filters=32, kernel_size=3, activation='relu'))
cnn.add(tf.keras.layers.MaxPool2D(pool_size=2, strides=2))

# In[10]:


cnn.add(tf.keras.layers.Flatten())

# In[11]:


cnn.add(tf.keras.layers.Dense(units=128, activation='relu'))

# In[12]:


cnn.add(tf.keras.layers.Dense(units=6, activation='softmax'))

# In[13]:


cnn.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])


cnn.fit(x=training_set, validation_data=test_set, epochs=20)


@imageReko.route('/click', methods=['POST'])
def predict_click():
    # path = 'dataset/single_prediction/'
    file = request.files['image']
    # Read the image via file.stream
    # img = Image.open(file.stream)
    load_img_rz = np.array(Image.open(file.stream).resize((64, 64)))
    test_image = image.img_to_array(load_img_rz)
    test_image = np.expand_dims(test_image, axis=0)
    print('HI')
    result = cnn.predict(test_image)
    if (result[0][0]) == 1: predict = "Sapling"
    if (result[0][1]) == 1: predict = 'Sawing Machine'
    if (result[0][2]) == 1: predict = 'TV'
    if (result[0][3]) == 1: predict = 'Table'
    if (result[0][4]) == 1: predict = 'Radio'
    if (result[0][5]) == 1: predict = 'Screw Driver'
    print(predict)
    return jsonify(predict)
    # return 'success'


@imageReko.route('/upload', methods=['POST'])
def predict_upload():
    path = request.args.get('path')
    print(path)
    print("inside method")
    test_image = image.load_img(path,
                                target_size=(64, 64))
    test_image = image.img_to_array(test_image)
    test_image = np.expand_dims(test_image, axis=0)
    result = cnn.predict(test_image)
    # print(training_set.class_indices)
    if (result[0][0]) == 1: predict = "Sapling"
    if (result[0][1]) == 1: predict = 'Sawing Machine'
    if (result[0][2]) == 1: predict = 'TV'
    if (result[0][3]) == 1: predict = 'Table'
    if (result[0][4]) == 1: predict = 'Radio'
    if (result[0][5]) == 1: predict = 'Screw Driver'
    print(predict)
    return jsonify(op=predict)


if __name__ == "__main__":
    imageReko.run(debug=True, port=8000)
