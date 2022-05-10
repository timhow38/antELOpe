// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyAJt2KC0MsGVjO_NHQ5Tne1jnYxwE051Hk',
    appId: '1:565124740259:web:ded67713795ae0b5283b16',
    messagingSenderId: '565124740259',
    projectId: 'ant-elo-pe',
    authDomain: 'ant-elo-pe.firebaseapp.com',
    storageBucket: 'ant-elo-pe.appspot.com',
    measurementId: 'G-2BC78KMDS8',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyD4reQPg9rF2x4TRWkrDOFryNElcAHXY5o',
    appId: '1:565124740259:android:0c6d838bf403fe1f283b16',
    messagingSenderId: '565124740259',
    projectId: 'ant-elo-pe',
    storageBucket: 'ant-elo-pe.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyB9yTrxWWnPOvidVGoMBQrfChK142xF8YA',
    appId: '1:565124740259:ios:bdc25a503a74d8e1283b16',
    messagingSenderId: '565124740259',
    projectId: 'ant-elo-pe',
    storageBucket: 'ant-elo-pe.appspot.com',
    iosClientId: '565124740259-u2k21m6p5ffr1sbaqotoqbvv5iufmlck.apps.googleusercontent.com',
    iosBundleId: 'com.example.antelope',
  );
}
