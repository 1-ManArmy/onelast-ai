          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-300">
                    <Star className="w-5 h-5" />
                    Birth Chart Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-purple-200 mb-2 block">
                      Birth Date *
                    </label>
                    <Input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="bg-black/30 border-purple-500/50 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-purple-200 mb-2 block">
                      Birth Time (Higher Accuracy)
                    </label>
                    <Input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="bg-black/30 border-purple-500/50 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-purple-200 mb-2 block">
                      Birth Location (Precision Enhancement)
                    </label>
                    <Input
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="bg-black/30 border-purple-500/50 text-white"
                      placeholder="City, Country"
                    />
                  </div>

                  {latitude !== 0 && longitude !== 0 && (
                    <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <p className="text-xs text-green-300 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Location detected: {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {selectedSign && (
                <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-300">Your Cosmic Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-4"
                    >
                      <motion.div
                        className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl font-bold text-white shadow-2xl relative"
                        style={{ backgroundColor: selectedSign.color }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {selectedSign.symbol}
                        <div className="absolute inset-0 rounded-full animate-ping bg-white/20"></div>
                      </motion.div>
                      
                      <div>
                        <h3 className="text-3xl font-bold text-white">{selectedSign.name}</h3>
                        <p className="text-purple-300">{selectedSign.dates}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <Badge variant="secondary" className="w-full justify-center bg-purple-600/50">
                            {selectedSign.element} Sign
                          </Badge>
                          <Badge variant="outline" className="w-full justify-center border-cyan-400 text-cyan-300">
                            {selectedSign.quality}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Badge variant="secondary" className="w-full justify-center bg-yellow-600/50">
                            House {selectedSign.house}
                          </Badge>
                          <Badge variant="outline" className="w-full justify-center border-orange-400 text-orange-300">
                            {selectedSign.planet}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-center">
                        {selectedSign.traits.map((trait) => (
                          <Badge key={trait} variant="secondary" className="text-xs bg-gradient-to-r from-purple-600/50 to-cyan-600/50">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={generateReading}
                disabled={!selectedSign || !birthDate || isGenerating}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 shadow-2xl"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-2"
                  >
                    <Brain className="w-5 h-5" />
                    Consulting Cosmic AI...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Generate Ultra-Precise Reading
                  </div>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* AI Reading Tab */}
          <TabsContent value="reading" className="space-y-6">
            <AnimatePresence>
              {reading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Accuracy Score */}
                  <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-sm border-green-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-green-300">Reading Accuracy</h3>
                          <p className="text-green-200">Based on astronomical precision</p>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-bold text-green-300">{reading.accuracy}%</div>
                          <div className="text-sm text-green-200">Professional Grade</div>
                        </div>
                      </div>
                      <div className="mt-4 bg-black/30 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${reading.accuracy}%` }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Main Reading Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm border-yellow-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-300">
                          <Sun className="w-5 h-5" />
                          Today's Cosmic Energy
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-yellow-100 leading-relaxed">{reading.today}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-300">
                          <Calendar className="w-5 h-5" />
                          Tomorrow's Forecast
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-blue-100 leading-relaxed">{reading.tomorrow}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-300">
                          <Star className="w-5 h-5" />
                          Weekly Highlights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-purple-100 leading-relaxed">{reading.week}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-rose-900/30 to-red-900/30 backdrop-blur-sm border-rose-500/30">
                      <CardHeader>
                        <CardTitle className="text-rose-300">Love & Romance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-rose-100 leading-relaxed">{reading.love}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-green-300">Career & Wealth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-100 leading-relaxed">{reading.career}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-cyan-900/30 to-teal-900/30 backdrop-blur-sm border-cyan-500/30">
                      <CardHeader>
                        <CardTitle className="text-cyan-300">Health & Vitality</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-cyan-100 leading-relaxed">{reading.health}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timing & Opportunities */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 backdrop-blur-sm border-amber-500/30">
                      <CardHeader>
                        <CardTitle className="text-amber-300">⚡ Major Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-amber-100 leading-relaxed mb-4">{reading.opportunities}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-amber-200">Best Days:</h4>
                          <div className="flex flex-wrap gap-2">
                            {reading.timing.bestDays.map((day) => (
                              <Badge key={day} className="bg-green-600/50 text-green-200">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm border-red-500/30">
                      <CardHeader>
                        <CardTitle className="text-red-300">⚠️ Cosmic Warnings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-red-100 leading-relaxed mb-4">{reading.warnings}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-red-200">Challenging Days:</h4>
                          <div className="flex flex-wrap gap-2">
                            {reading.timing.challengingDays.map((day) => (
                              <Badge key={day} variant="destructive" className="bg-red-600/50">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Lucky Elements */}
                  <Card className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 backdrop-blur-sm border-violet-500/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-violet-300">
                        <Sparkles className="w-5 h-5" />
                        Lucky Elements & Optimal Timing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <h4 className="font-semibold mb-3 text-violet-200">Lucky Numbers</h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {reading.lucky.numbers.map((num) => (
                              <div key={num} className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {num}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-center">
                          <h4 className="font-semibold mb-3 text-violet-200">Power Colors</h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {reading.lucky.colors.map((color) => (
                              <Badge key={color} className="bg-gradient-to-r from-violet-600/50 to-purple-600/50 text-xs">
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-center">
                          <h4 className="font-semibold mb-3 text-violet-200">Power Stones</h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {reading.lucky.stones.map((stone) => (
                              <Badge key={stone} className="bg-gradient-to-r from-violet-600/50 to-purple-600/50 text-xs">
                                {stone}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-center">
                          <h4 className="font-semibold mb-3 text-violet-200">Optimal Times</h4>
                          <div className="space-y-1">
                            {reading.lucky.times.slice(0, 3).map((time) => (
                              <div key={time} className="text-xs text-violet-300 bg-violet-900/30 px-2 py-1 rounded">
                                {time}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {!reading && (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 mx-auto mb-6 opacity-50"
                >
                  <div className="w-full h-full rounded-full border-4 border-dashed border-purple-500 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-purple-400" />
                  </div>
                </motion.div>
                <p className="text-purple-300">Enter your birth details and generate a reading to see your cosmic insights</p>
              </div>
            )}
          </TabsContent>
